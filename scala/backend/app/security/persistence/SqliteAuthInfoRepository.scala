package security.persistence

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.impl.providers.OAuth2Info
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import model.oauth.OAuth2Entity
import play.api.Configuration
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.Json.JsValueWrapper
import play.api.libs.json.{Format, JsObject, JsResult, JsSuccess, JsValue, Json, Reads, Writes}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}
import scala.reflect.ClassTag

object SqliteAuthInfoRepository {
  implicit val mapReads: Reads[Map[String, String]] = new Reads[Map[String, String]] {
    def reads(jv: JsValue): JsResult[Map[String, String]] = {
      jv match {
        case m@JsObject(_) => {
          val d = m.value.map {
            case (k, v) => (k, v.as[String])
          }.toMap
          JsSuccess(d)
        }
        case _ => JsSuccess(Map[String, String]())
      }
    }
  }

  implicit val mapWrites: Writes[Map[String, String]] = new Writes[Map[String, String]] {
    def writes(map: Map[String, String]): JsValue =
      Json.obj(map.map{case (s, o) =>
        val ret: (String, JsValueWrapper) = s -> o
        ret
      }.toSeq:_*)
  }
}

class SqliteAuthInfoRepository(dbConfigProvider: DatabaseConfigProvider, config: Configuration)(implicit val classTag: ClassTag[OAuth2Info], ex: ExecutionContext)
  extends DelegableAuthInfoDAO[OAuth2Info] {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  implicit val MapJson: Format[Map[String, String]] = Format(SqliteAuthInfoRepository.mapReads, SqliteAuthInfoRepository.mapWrites)

  implicit val mapToString: Map[String, String] => String = m => MapJson.writes(m).toString()

  private class OAuth2Table(tag: Tag) extends Table[OAuth2Entity](tag, "OAuthUser") {

    def providerId = column[String]("provider_id")

    def providerKey = column[String]("provider_key")

    def accessToken = column[String]("access_token")

    def tokenType = column[Option[String]]("token_type")

    def expiresIn = column[Option[Int]]("expires_in")

    def refreshToken = column[Option[String]]("refresh_token")

    def params = column[String]("params")

    def intoUser(tuple: (String, String, String, Option[String], Option[Int], Option[String], String)): OAuth2Entity = {
      val stringAsMap = MapJson.reads(Json.parse(tuple._7)).get
      OAuth2Entity(tuple._1, tuple._2, tuple._3, tuple._4, tuple._5, tuple._6, stringAsMap)
    }

    def fromUser(oauth2Entity: OAuth2Entity): Option[(String, String, String, Option[String], Option[Int], Option[String], String)] = {
      Some((oauth2Entity.providerId, oauth2Entity.providerKey, oauth2Entity.accessToken, oauth2Entity.tokenType, oauth2Entity.expiresIn, oauth2Entity.refreshToken, oauth2Entity.params))
    }

    def * = (providerId, providerKey, accessToken, tokenType, expiresIn, refreshToken, params) <> (intoUser, fromUser)

  }

  private val oAuth2 = TableQuery[OAuth2Table]

  override def find(loginInfo: LoginInfo): Future[Option[OAuth2Info]] = db.run {
    oAuth2.filter(x => x.providerId === loginInfo.providerID && x.providerKey === loginInfo.providerKey)
      .take(1)
      .result
      .headOption
      .map(x => x match {
        case Some(oauth2) => Some(OAuth2Info(oauth2.accessToken, oauth2.tokenType, oauth2.expiresIn, oauth2.refreshToken, Some(oauth2.params)))
        case None => None
      })
  }

  override def add(loginInfo: LoginInfo, authInfo: OAuth2Info): Future[OAuth2Info] = db.run {
    val oauth2Entity = OAuth2Entity(loginInfo.providerID, loginInfo.providerKey,
      authInfo.accessToken,
      authInfo.tokenType,
      authInfo.expiresIn,
      authInfo.refreshToken,
      authInfo.params match {
        case Some(m) => m
        case None => Map[String, String]()
      }
    )
    val query = oAuth2 += oauth2Entity
    query.map(_ => authInfo)
  }

  override def update(loginInfo: LoginInfo, authInfo: OAuth2Info): Future[OAuth2Info] = db.run {
    val user = for { x <- oAuth2 if x.providerId === loginInfo.providerID && x.providerKey === loginInfo.providerKey } yield
      (x.accessToken, x.tokenType, x.expiresIn, x.refreshToken, x.params)
    user.update((authInfo.accessToken, authInfo.tokenType, authInfo.expiresIn, authInfo.refreshToken, authInfo.params match {
      case Some(m) => m
      case None => Map[String, String]()
    })).map(_ => authInfo)
  }

  override def save(loginInfo: LoginInfo, authInfo: OAuth2Info): Future[OAuth2Info] = db.run {
    return find(loginInfo).flatMap(futureLoginInfo => {
      futureLoginInfo match {
        case Some(x) => Future.successful(x)
        case None => add(loginInfo, authInfo)
      }
    })
  }

  override def remove(loginInfo: LoginInfo): Future[Unit] = db.run {
    val user = for { x <- oAuth2 if x.providerId === loginInfo.providerID && x.providerKey === loginInfo.providerKey } yield x
    user.delete.map(_ => ())
  }

}

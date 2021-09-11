package model.user.repo

import model.user.User
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserRepositoryImpl @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) extends UserRepository {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class UserTable(tag: Tag) extends Table[User](tag, "User") {
    def id = column[String]("id", O.PrimaryKey)
    def firstName = column[Option[String]]("first_name")
    def lastName = column[Option[String]]("last_name")
    def fullName = column[Option[String]]("full_name")
    def email = column[Option[String]]("email")
    def avatarUrl = column[Option[String]]("avatar_url")


    def * = (id, firstName, lastName, fullName, email, avatarUrl) <> (User.tupled, User.unapply)
  }

  val user = TableQuery[UserTable]

  def list(): Future[Seq[User]] = db.run {
    user.result
  }

  def find(id: String): Future[Option[User]] = db.run {
    user.filter(_.id === id)
      .take(1)
      .result
      .headOption
  }


  def save(newUser: User): Future[User] = db.run {
    val query = user += newUser
    query.map(_ => newUser)
  }

  def update(updateUser: User): Future[User] = db.run {
    val usr = for {x <- user if x.id === updateUser.userID} yield (x.firstName, x.lastName, x.fullName, x.email, x.avatarUrl)
    val query = usr.update((updateUser.firstName, updateUser.lastName, updateUser.fullName, updateUser.email, updateUser.avatarURL))
    query.map(_ => updateUser)
  }

}

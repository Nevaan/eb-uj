package model.team

import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class TeamRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext){
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class TeamTable(tag: Tag) extends Table[Team](tag, "Team") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")
    def description = column[String]("description")

    def * = (id, name, description) <> ((Team.apply _).tupled, Team.unapply)
  }

  val team = TableQuery[TeamTable]

  def create(name: String, description: String): Future[Team] = db.run {
    (team.map(t => (t.name, t.description))
      returning team.map(_.id)
      into { case ((name, description), id) => Team(id, name, description)}
      ) += (name, description)
  }

  def list(): Future[Seq[Team]] = db.run {
    team.result
  }

  def getById(id: Long): Future[Option[Team]] = db.run {
    team.filter(_.id === id)
      .take(1)
      .result
      .headOption
  }

  def update(id: Long, name: String, description: String): Future[Team] = db.run {
    val toUpdate = for { t <- team if t.id === id } yield (t.name, t.description)
    val q = toUpdate.update((name, description))
    q.map(_ => Team(id, name ,description))
  }

  def delete(id: Long): Future[Int] = db.run {
    val toRemove = team.filter(_.id === id)
    toRemove.delete
  }

}

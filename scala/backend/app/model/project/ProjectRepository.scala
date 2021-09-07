package model.project

import model.team.TeamRepository

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProjectRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, val teamRepository: TeamRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class ProjectTable(tag: Tag) extends Table[Project](tag, "Project") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def description = column[String]("description")
    def teamId = column[Long]("teamId")

    def sprintId = column[Option[Long]]("sprintId")
    def backlogId = column[Option[Long]]("backlogId")

    def team = foreignKey("Team", teamId, teamRepository.team)(_.id)
    def sprint = foreignKey("ProjectStage", sprintId, teamRepository.team)(_.id)
    def backlog = foreignKey("ProjectStage", backlogId, teamRepository.team)(_.id)

    def * = (id, name, description, teamId, sprintId, backlogId) <> ((Project.apply _).tupled, Project.unapply)
  }

  val project = TableQuery[ProjectTable]

  def create(name: String, description: String, teamId: Long): Future[Project] = db.run {
    (project.map(t => (t.name, t.description, t.teamId, t.sprintId, t.backlogId))
      returning project.map(_.id)
      into { case ((name, description, teamId, sprintId, backlogId), id) => Project(id, name, description, teamId, sprintId, backlogId)}
      ) += (name, description, teamId, None, None)
  }

  def list(): Future[Seq[Project]] = db.run {
    project.result
  }

  def getById(id: Long): Future[Option[Project]] = db.run {
      project.filter(_.id === id)
        .take(1)
        .result
        .headOption
  }

  def update(id: Long, name: String, description: String): Future[Int] = db.run {
    val toUpdate = for { p <- project if p.id === id } yield (p.name, p.description)
    toUpdate.update((name, description))
  }

  def setBacklog(id: Long, backlogId: Long): Future[Long] = db.run {
    val toUpdate = for { p <- project if p.id === id } yield p.backlogId
    toUpdate.update(Some(backlogId)).map(result => id)
  }

  def delete(id: Long): Future[Int] = db.run {
    val toRemove = project.filter(_.id === id)
    toRemove.delete
  }

}
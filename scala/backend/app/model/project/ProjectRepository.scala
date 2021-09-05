package model.project

import model.team.TeamRepository

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProjectRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, val teamRepository: TeamRepository)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class ProjectTable(tag: Tag) extends Table[Project](tag, "Project") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def description = column[String]("description")
    def teamId = column[Long]("teamId")

    def team = foreignKey("Team", teamId, teamRepository.team)(_.id)

    def * = (id, name, description, teamId) <> ((Project.apply _).tupled, Project.unapply)
  }

  private val project = TableQuery[ProjectTable]

  def create(name: String, description: String, teamId: Long): Future[Project] = db.run {
    (project.map(t => (t.name, t.description, t.teamId))
      returning project.map(_.id)
      into { case ((name, description, teamId), id) => Project(id, name, description, teamId)}
      ) += (name, description, teamId)
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

  def delete(id: Long): Future[Int] = db.run {
    val toRemove = project.filter(_.id === id)
    toRemove.delete
  }

}
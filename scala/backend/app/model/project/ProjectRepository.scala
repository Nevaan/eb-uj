package model.project

import model.dto.AddProject

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProjectRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class ProjectTable(tag: Tag) extends Table[Project](tag, "Project") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def description = column[String]("description")

    def * = (id, name, description) <> ((Project.apply _).tupled, Project.unapply)
  }

  private val project = TableQuery[ProjectTable]

  def create(name: String, description: String): Future[Project] = db.run {
    (project.map(t => (t.name, t.description))
      returning project.map(_.id)
      into { case ((name, description), id) => Project(id, name, description)}
      ) += (name, description)
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

}
package model.project

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

  def list(): Future[Seq[Project]] = db.run {
    project.result
  }

}
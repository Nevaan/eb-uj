package model.projectstage

import model.project.ProjectRepository
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
class ProjectStageRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, val projectRepository: ProjectRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class ProjectStageTable(tag: Tag) extends Table[ProjectStage](tag, "ProjectStage") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def description = column[String]("description")

    def projectId = column[Long]("projectId")

    def project = foreignKey("Project", projectId, projectRepository.project)(_.id)

    def * = (id, description, projectId) <> ((ProjectStage.apply _).tupled, ProjectStage.unapply)
  }

  val projectStage = TableQuery[ProjectStageTable]

  def create(description: String, projectId: Long) =  db.run {
    (projectStage.map(t => (t.description, t.projectId))
      returning projectStage.map(_.id)
      into { case ((description, projectId), id) => ProjectStage(id, description, projectId)}
      ) += (description, projectId)
  }

}

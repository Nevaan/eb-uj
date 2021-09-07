package model.projectstage

import model.project.{Project, ProjectRepository}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

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
  def getProjectForBacklog(backlogId: Long): Future[Option[Project]] = db.run {
    projectStage.filter(_.id === backlogId).flatMap(_.project).result.headOption
  }

  def getBacklogByProjectId(projectId: Long): Future[Option[ProjectStage]] = db.run {
    projectStage.join(projectRepository.project).filter(res =>
      res._2.id === projectId
    )
      .filter(fx => fx._1.id === fx._2.backlogId)
      .map(tup => tup._1)
      .take(1)
      .result
      .headOption
  }

  def getSprintByProjectId(projectId: Long): Future[Option[ProjectStage]] = db.run {
    projectStage.join(projectRepository.project).filter(res =>
      res._2.id === projectId
    )
      .filter(fx => fx._1.id === fx._2.sprintId)
      .map(tup => tup._1)
      .take(1)
      .result
      .headOption
  }

  def updateStage(stageId: Long, description: String): Future[Int] = db.run {
    val toUpdate = for { p <- projectStage if p.id === stageId } yield ( p.description )
    toUpdate.update(description)
  }

}

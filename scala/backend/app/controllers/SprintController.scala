package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.{StartSprint, UpdateSprint}
import model.project.ProjectRepository
import model.projectstage.ProjectStageRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class SprintController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                                 projectStageRepository: ProjectStageRepository, projectRepository: ProjectRepository) extends BaseController {

  def create = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>

    val content = request.body
    val jsonObject = content.asJson
    val startSprintDto: Option[StartSprint] =
      jsonObject.flatMap(
        Json.fromJson[StartSprint](_).asOpt
      )
    startSprintDto match {
      case Some(body) => {
        projectStageRepository.getProjectForBacklog(body.backlogId).flatMap(result => {
          result match {
            case Some(project) => {
              project.sprintId match {
                case Some(_) => {
                  Future { Conflict }
                }
                case None => {
                  projectRepository.setSprintId(body.projectId, Some(body.backlogId))
                    .flatMap(_ => {
                      projectStageRepository.create("Backlog", project.id)
                    })
                    .flatMap(stage => {
                      projectRepository.setBacklog(stage.projectId, stage.id)
                    })
                    .map(_ => Ok("Sprint started"))
                }
              }
            }
            case None => Future { NotFound }
          }
        })
      }
      case None => Future { BadRequest }
    }
  }

  def get(projectId: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    projectStageRepository.getSprintByProjectId(projectId)
      .map(res => {
        res match {
          case Some(sprint) => Ok(Json.toJson(sprint))
          case None => NotFound
        }
      })
  }
  def update(projectId: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>

    val content = request.body
    val jsonObject = content.asJson
    val updateSprintDto: Option[UpdateSprint] =
      jsonObject.flatMap(
        Json.fromJson[UpdateSprint](_).asOpt
      )

    updateSprintDto match {
      case Some(body) => {
        projectStageRepository.getSprintByProjectId(projectId)
          .map(res => {
            res match {
              case Some(sprint) => {
                projectStageRepository.updateStage(sprint.id, body.description)
                Ok("Sprint updated")
              }
              case None => NotFound
            }
          })
      }
      case None => Future { BadRequest }
    }

  }
  def delete(projectId: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    projectRepository.setSprintId(projectId, None).map(res => {
      res match {
        case 1 => Ok
        case _ => InternalServerError
      }
    })
  }

}
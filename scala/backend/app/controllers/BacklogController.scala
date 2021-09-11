package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.UpdateBacklog
import model.projectstage.ProjectStageRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class BacklogController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                                  projectStageRepository: ProjectStageRepository) extends BaseController {

  def get(projectId: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    projectStageRepository.getBacklogByProjectId(projectId)
      .map(res => {
        res match {
          case Some(backlog) => Ok(Json.toJson(backlog))
          case None => NotFound
        }
      })
  }

  def update(projectId: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>

    val content = request.body
    val jsonObject = content.asJson
    val updateBacklogDto: Option[UpdateBacklog] =
      jsonObject.flatMap(
        Json.fromJson[UpdateBacklog](_).asOpt
      )

    updateBacklogDto match {
      case Some(body) => {
        projectStageRepository.getBacklogByProjectId(projectId)
          .map(res => {
            res match {
              case Some(backlog) => {
                projectStageRepository.updateStage(backlog.id, body.description)
                Ok("Backlog updated")
              }
              case None => NotFound
            }
          })
      }
      case None => Future { BadRequest }
    }
  }

}
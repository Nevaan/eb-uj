package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.{AddProject, UpdateProject}
import model.project.ProjectRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class ProjectController @Inject()(silhouette: Silhouette[CookieEnv], projectRepository: ProjectRepository, val controllerComponents: ControllerComponents) extends BaseController {

  def create = silhouette.SecuredAction.async { implicit request =>

    val content = request.body
    val jsonObject = content.asJson
    val addProjectDto: Option[AddProject] =
      jsonObject.flatMap(
        Json.fromJson[AddProject](_).asOpt
      )

    addProjectDto match {
      case Some(project) => {
        projectRepository.create(project.name, project.description, project.teamId).map(res =>
          Ok(Json.toJson(res))
        )
      }
      case None => {
        Future {
          BadRequest
        }
      }
    }
  }

  def get = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    projectRepository.list() map { list =>
      Ok(Json.toJson(list))
    }
  }

  def getById(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    projectRepository.getById(id) map { project =>
      project match {
        case Some(x) => Ok(Json.toJson(x))
        case None => NotFound
      }
    }
  }

  def update(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    val content = request.body
    val jsonObject = content.asJson
    val updateProjectDto: Option[UpdateProject] =
      jsonObject.flatMap(
        Json.fromJson[UpdateProject](_).asOpt
      )

    updateProjectDto match {
      case Some(x) => {
        projectRepository.update(id, x.name, x.description)
          .flatMap(_ => projectRepository.getById(id))
          .map(res => {
            res match {
              case Some(resp) => Ok(Json.toJson(resp))
              case None => BadRequest
            }
        })
      }
      case None => {
        Future {
          BadRequest
        }
      }
    }
  }

  def delete(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    projectRepository.delete(id).map(result =>
      result match {
        case 0 =>
          NotFound
        case 1 =>
          Ok("delete project")
        case _ =>
          InternalServerError
      }
    )

  }

}

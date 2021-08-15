package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.AddProject
import model.project.ProjectRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class ProjectController @Inject()(silhouette: Silhouette[CookieEnv], projectRepository: ProjectRepository, val controllerComponents: ControllerComponents) extends BaseController {

  implicit val addProjectFormat = Json.format[AddProject]

  def create = silhouette.SecuredAction.async { implicit request =>

    val content = request.body
    val jsonObject = content.asJson
    val addProjectDto: Option[AddProject] =
      jsonObject.flatMap(
        Json.fromJson[AddProject](_).asOpt
      )

    addProjectDto match {
      case Some(project) => {
        projectRepository.create(project.name, project.description).map(res =>
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

  def update = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("update project")
  }
  def delete = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("delete project")
  }

}

package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.project.ProjectRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class ProjectsController @Inject()(silhouette: Silhouette[CookieEnv], projectRepository: ProjectRepository, val controllerComponents: ControllerComponents) extends BaseController {

  def get = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    projectRepository.list() map { list =>
      Ok(Json.toJson(list))
    }
  }

}

package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.project.ProjectRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class ProjectController @Inject()(silhouette: Silhouette[CookieEnv], projectRepository: ProjectRepository, val controllerComponents: ControllerComponents) extends BaseController {

  def get = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    projectRepository.list() map { list =>
      Ok(Json.toJson(list))
    }
  }

  def create = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("create project")
  }

  def update = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("update project")
  }
  def delete = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("delete project")
  }

}

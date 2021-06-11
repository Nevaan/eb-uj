package controllers

import model.project.ProjectRepository
import model.trip.{Trip, TripRepository}
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class ProjectsController @Inject()(projectRepository: ProjectRepository, val controllerComponents: ControllerComponents) extends BaseController {
  implicit val tripJson = Json.format[Trip]

  def get = Action.async { implicit request: Request[AnyContent] =>
    projectRepository.list() map { list =>
      Ok(Json.toJson(list))
    }
  }

}

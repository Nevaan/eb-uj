package controllers

import model.Dumb

import javax.inject._
import play.api.mvc._
import play.api.libs.json._

@Singleton
class NoteController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  implicit val dumbJson = Json.format[Dumb]

  def create = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create note!")))
  }

  def get = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create note!")))
  }

  def update = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create note!")))
  }

  def delete = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create note!")))
  }
}
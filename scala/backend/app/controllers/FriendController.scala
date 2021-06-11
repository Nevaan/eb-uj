package controllers

import model.Dumb

import javax.inject._
import play.api.mvc._
import play.api.libs.json._

@Singleton
class FriendController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  implicit val dumbJson = Json.format[Dumb]

  def create = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create friend!")))
  }

  def get = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create friend!")))
  }

  def update = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create friend!")))
  }

  def delete = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create friend!")))
  }
}
package controllers

import model.Dumb

import javax.inject._
import play.api.mvc._
import play.api.libs.json._

@Singleton
class ShoppingListController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  implicit val dumbJson = Json.format[Dumb]

  def create = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create shopping list!")))
  }

  def get = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create shopping list!")))
  }

  def update = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create shopping list!")))
  }

  def delete = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create shopping list!")))
  }
}
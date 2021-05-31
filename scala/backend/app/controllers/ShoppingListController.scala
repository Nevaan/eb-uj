package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._

@Singleton
class ShoppingListController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  def create = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def get = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def update = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def delete = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }
}
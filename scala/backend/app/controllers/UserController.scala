package controllers

import com.mohiva.play.silhouette.api.Silhouette

import javax.inject._
import play.api.mvc._
import security.environment.CookieEnv

@Singleton
class UserController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents) extends BaseController {


  def create = Action { implicit request: Request[AnyContent] =>
    Ok("1")
  }

  def get = Action { implicit request: Request[AnyContent] =>
    Ok("2")
  }

  def update = Action { implicit request: Request[AnyContent] =>
    Ok("3")
  }

  def delete = Action { implicit request: Request[AnyContent] =>
    Ok("4")
  }

}
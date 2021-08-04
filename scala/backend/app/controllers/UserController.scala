package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.Dumb
import model.user.User

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import security.environment.CookieEnv

@Singleton
class UserController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents) extends BaseController {
  implicit val userWrites: Writes[User] = Writes { user =>
    Json.obj(
      "email" -> user.email,
      "firstName" -> user.firstName,
      "lastName" -> user.lastName,
      "fullName" -> user.fullName,
      "avatarURL" -> user.avatarURL
    )
  }

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

  def profile = silhouette.SecuredAction { implicit request =>
    val identity = request.identity
    Ok(Json.toJson(identity))
  }
}
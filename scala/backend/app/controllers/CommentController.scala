package controllers

import com.mohiva.play.silhouette.api.Silhouette
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}

@Singleton
class CommentController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents) extends BaseController {

  def create = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("create comment")
  }

  def get = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("get comment")
  }
  def update = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("update comment")
  }
  def delete = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("delete comment")
  }

}
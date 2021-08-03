package controllers

import com.mohiva.play.silhouette.api.Silhouette
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}


@Singleton
class SprintController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents) extends BaseController {

  def create = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("create sprint")
  }

  def get = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("get sprint")
  }
  def update = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("update sprint")
  }
  def delete = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("delete sprint")
  }

}
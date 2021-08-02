package controllers

import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}

import javax.inject.{Inject, Singleton}

@Singleton
class HealthCheck @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  def hc() = Action { implicit request: Request[AnyContent] =>
    Ok("Healthcheck ok")
  }
}

package controllers

import com.fasterxml.jackson.databind.JsonNode
import model.Dumb
import model.dto.NewTrip
import model.trip.{Trip, TripRepository}

import javax.inject._
import play.api.mvc._
import play.api.libs.json._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{Failure, Success, Try}

@Singleton
class TripController @Inject()(tripRepository: TripRepository, val controllerComponents: ControllerComponents) extends BaseController {
  implicit val dumbJson = Json.format[Dumb]
  implicit val tripJson = Json.format[Trip]

  val create = Action.async(parse.json) { implicit request =>
    request.body.validate[NewTrip] match {
      case JsSuccess(trip, _) =>
        tripRepository.create(trip.name, trip.description) transform {
          case Success(createdTrip) => Try(Ok(Json.toJson(createdTrip)))
          case Failure(cause) => Try(Ok("No good"))
        }
      case JsError(errors) =>
        println(errors)
        Future.successful(BadRequest)
    }
  }

  def get = Action.async { implicit request: Request[AnyContent] =>
    tripRepository.list() map { list =>
      Ok(Json.toJson(list))
    }
  }

  def update = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create trip!")))
  }

  def delete = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(Dumb("create trip!")))
  }
}
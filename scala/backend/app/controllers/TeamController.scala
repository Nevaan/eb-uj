package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.{AddTeam, UpdateTeam}
import model.team.TeamRepository
import model.teamtoemployee.TeamToEmployeeRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class TeamController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                               teamRepository: TeamRepository,
                               teamToEmployeeRepository: TeamToEmployeeRepository) extends BaseController {

  def create = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    val content = request.body
    val jsonObject = content.asJson
    val addTeamDto: Option[AddTeam] =
      jsonObject.flatMap(
        Json.fromJson[AddTeam](_).asOpt
      )

    addTeamDto match {
      case Some(team) => {
        teamRepository.create(team.name, team.description).map(res =>
          Ok(Json.toJson(res))
        )
      }
      case None => {
        Future {
          BadRequest
        }
      }
    }

  }

  def get = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    teamRepository.list() map { list =>
      Ok(Json.toJson(list))
    }
  }

  def getById(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    teamRepository.getById(id) map { team =>
      team match {
        case Some(x) => Ok(Json.toJson(x))
        case None => NotFound
      }
    }
  }

  def getTeamEmployees(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    teamToEmployeeRepository.getEmployees(id) map { employees =>
      Ok(Json.toJson(employees))
    }
  }

  def update(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    val content = request.body
    val jsonObject = content.asJson
    val updateTeamDto: Option[UpdateTeam] =
      jsonObject.flatMap(
        Json.fromJson[UpdateTeam](_).asOpt
      )

    updateTeamDto match {
      case Some(x) => {
        teamRepository.update(id, x.name, x.description).map(res => {
          Ok(Json.toJson(res))
        })
      }
      case None => {
        Future {
          BadRequest
        }
      }
    }
  }
  def delete(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    teamToEmployeeRepository.removeByTeamId(id)
    teamRepository.delete(id).map(result =>
      result match {
        case 0 =>
          NotFound
        case 1 =>
          Ok("delete team")
        case _ =>
          InternalServerError
      }
    )
  }

}
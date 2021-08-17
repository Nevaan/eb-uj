package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.{AddEmployee, UpdateEmployee}
import model.employee.EmployeeRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class EmployeeController @Inject()(silhouette: Silhouette[CookieEnv], employeeRepository: EmployeeRepository, val controllerComponents: ControllerComponents) extends BaseController {

  def create = silhouette.SecuredAction.async { implicit request =>

    val content = request.body
    val jsonObject = content.asJson
    val addEmployeeDto: Option[AddEmployee] =
      jsonObject.flatMap(
        Json.fromJson[AddEmployee](_).asOpt
      )

    addEmployeeDto match {
      case Some(employee) => {
        employeeRepository.create(employee.name, employee.surname).map(res =>
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
    employeeRepository.list() map { list =>
      Ok(Json.toJson(list))
    }
  }

  def getById(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    employeeRepository.getById(id) map { employee =>
      employee match {
        case Some(x) => Ok(Json.toJson(x))
        case None => NotFound
      }
    }
  }

  def update(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    val content = request.body
    val jsonObject = content.asJson
    val updateEmployeeDto: Option[UpdateEmployee] =
      jsonObject.flatMap(
        Json.fromJson[UpdateEmployee](_).asOpt
      )

    updateEmployeeDto match {
      case Some(x) => {
        employeeRepository.update(id, x.name, x.surname).map(res => {
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


}
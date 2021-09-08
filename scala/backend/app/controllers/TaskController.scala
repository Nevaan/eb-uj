package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.{AddTask, UpdateTask}
import model.task.TaskRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class TaskController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                               taskRepository: TaskRepository) extends BaseController {

  def create = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    val content = request.body
    val jsonObject = content.asJson
    val addTaskDto: Option[AddTask] =
      jsonObject.flatMap(
        Json.fromJson[AddTask](_).asOpt
      )

    addTaskDto match {
      case Some(task) => {
        taskRepository.create(task.description, task.storyId, None, task.assigneeId)
          .map(res => Ok(Json.toJson(res)))
      }
      case None => {
        Future {
          BadRequest
        }
      }
    }
  }

  def get(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    taskRepository.getTaskById(id) map { task =>
      task match {
        case Some(t) => Ok(Json.toJson(t))
        case None => NotFound
      }
    }
  }

  def getTasksForStory(storyId: Long)= silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    taskRepository.getTasksForStory(storyId) map { tasks =>
      Ok(Json.toJson(tasks))
    }
  }

  def update(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    val content = request.body
    val jsonObject = content.asJson
    val updateTaskDto: Option[UpdateTask] =
      jsonObject.flatMap(
        Json.fromJson[UpdateTask](_).asOpt
      )

    updateTaskDto match {
      case Some(dto) => taskRepository.update(id, dto.description).map(_ => Ok("Updated task"))
      case None => Future { BadRequest }
    }
  }

  def assignEmployee(id: Long, employeeId: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    taskRepository.assignEmployee(id, Some(employeeId)).map(res => {
      res match {
        case 1 => Ok("Updated assignee")
        case _ => InternalServerError
      }
    })
  }

  def delete = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("delete task")
  }

}
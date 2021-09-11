package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.{AddTask, GetTask, UpdateTask}
import model.projectstage.ProjectStageRepository
import model.story.StoryRepository
import model.task.TaskRepository
import play.api.Logging
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class TaskController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                               taskRepository: TaskRepository, storyRepository: StoryRepository,
                               projectStageRepository: ProjectStageRepository) extends BaseController with Logging {

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
    taskRepository.getTaskById(id) flatMap { task =>
      task match {
        case Some(t) => {

            storyRepository.get(t.storyId).flatMap(maybeStory => {
            maybeStory match {
              case Some(story) => {
                projectStageRepository.getProjectForStage(story.stageId)
                  .map(maybeProject => {
                    maybeProject match {
                      case Some(project) => {

                        Ok(Json.toJson(GetTask(t.id, t.description, t.storyId, t.parentId,
                          t.employeeId, project.teamId)))

                      }
                      case None => NotFound
                    }
                  })
              }
              case None => Future { NotFound }
            }
          })
        }
        case None => Future { NotFound }
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

  def deleteAssignment(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    taskRepository.assignEmployee(id, None).map(res => {
      res match {
        case 1 => Ok("Updated assignee")
        case _ => InternalServerError
      }
    })
  }

}
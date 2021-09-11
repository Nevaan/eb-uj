package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.{AddSubtask, GetSubtask, GetTask, UpdateSubtask}
import model.task.TaskRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import scala.concurrent.ExecutionContext.Implicits.global
import javax.inject.{Inject, Singleton}
import scala.concurrent.Future
import model.projectstage.ProjectStageRepository
import model.story.StoryRepository

@Singleton
class SubtaskController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                                  taskRepository: TaskRepository, storyRepository: StoryRepository,
                                  projectStageRepository: ProjectStageRepository) extends BaseController {

  def create = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    val content = request.body
    val jsonObject = content.asJson
    val addTaskDto: Option[AddSubtask] =
      jsonObject.flatMap(
        Json.fromJson[AddSubtask](_).asOpt
      )

    addTaskDto match {
      case Some(task) => {
        taskRepository.create(task.description, task.storyId, Some(task.taskId), task.assigneeId)
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
    taskRepository.getSubtaskById(id) flatMap { task =>
      task match {
        case Some(t) => {

          storyRepository.get(t.storyId).flatMap(maybeStory => {
            maybeStory match {
              case Some(story) => {
                projectStageRepository.getProjectForStage(story.stageId)
                  .map(maybeProject => {
                    maybeProject match {
                      case Some(project) => {

                        Ok(Json.toJson(GetSubtask(t.id, t.description, t.storyId, t.parentId,
                          t.employeeId, project.teamId)))

                      }
                      case None => NotFound
                    }
                  })
              }
              case None => Future {
                NotFound
              }
            }
          })
        }
        case None => Future {
          NotFound
        }
      }
    }
  }

  def getSubtasks(taskId: Long)= silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    taskRepository.getSubtasks(taskId) map { tasks =>
      Ok(Json.toJson(tasks))
    }
  }

  def update(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    val content = request.body
    val jsonObject = content.asJson
    val updateTaskDto: Option[UpdateSubtask] =
      jsonObject.flatMap(
        Json.fromJson[UpdateSubtask](_).asOpt
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
package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.{AddTimeEntry, TimeEntryTimeCount}
import model.task.TaskRepository
import model.timeentry.{TimeEntry, TimeEntryRepository}
import model.timeentrytosubtask.TimeEntrySubtaskRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class TimeEntryController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                                    timeEntrySubtaskRepository: TimeEntrySubtaskRepository,
                                    timeEntryRepository: TimeEntryRepository,
                                    taskRepository: TaskRepository) extends BaseController {

  def create = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>

    val content = request.body
    val jsonObject = content.asJson
    val addTimeEntryDto: Option[AddTimeEntry] =
      jsonObject.flatMap(
        Json.fromJson[AddTimeEntry](_).asOpt
      )

    addTimeEntryDto match {
      case Some(dto)=> {
        timeEntryRepository.create(dto.manHours, dto.assigneeId) flatMap (result => {
          timeEntrySubtaskRepository.addTimeEntryToSubtask(dto.subtaskId, result.id) map {
            updatedRows =>
              updatedRows match {
                case 1 => Ok(Json.toJson(TimeEntry(result.id, result.manHours, result.manHours)))
                case _ => InternalServerError
              }
          }
        })
      }
      case None => Future  { BadRequest }
    }
  }

  def getTimeEntriesForSubtask(subtaskId: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    timeEntrySubtaskRepository.getEntriesForSubtask(subtaskId)
      .map(result => Ok(Json.toJson(result)))
  }

  def getTimeEntriesCountForTask(taskId: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    taskRepository.getSubtasks(taskId).flatMap(subtasks => {
      def subtasksId = subtasks.map(sb => sb.id)
      timeEntrySubtaskRepository.getEntriesForSubtasks(subtasksId)
        .flatMap(result =>  {
          def total = result.map(entry => entry.manHours).reduce((x,y) => x+y)
          Future {
            Ok(Json.toJson(TimeEntryTimeCount(total)))
          }
        })
    })
  }

  def getTimeEntriesCountForStory(storyId: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    taskRepository.getTasksForStory(storyId).flatMap(tasks => {
      def tasksIds = tasks.map(task => task.id)
      taskRepository.getSubtasksForTaskIdList(tasksIds).flatMap( subtasks => {
        def subtasksId = subtasks.map(sb => sb.id)
        timeEntrySubtaskRepository.getEntriesForSubtasks(subtasksId)
          .flatMap(result =>  {
            def total = result.map(entry => entry.manHours).reduce((x,y) => x+y)
            Future {
              Ok(Json.toJson(TimeEntryTimeCount(total)))
            }
          })
      })
    })
  }

}
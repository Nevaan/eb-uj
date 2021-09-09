package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.{AddStory, GetStory, UpdateStory}
import model.project.ProjectRepository
import model.projectstage.ProjectStageRepository
import model.story.StoryRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class StoryController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                                storyRepository: StoryRepository, projectStageRepository: ProjectStageRepository) extends BaseController {

  def create = silhouette.SecuredAction.async { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val addStoryDto: Option[AddStory] =
      jsonObject.flatMap(
        Json.fromJson[AddStory](_).asOpt
      )

    addStoryDto match {
      case Some(story) => {
          storyRepository.create(story.name, story.description, story.stageId)
            .map(res => Ok(Json.toJson(res)))
      }
      case None => {
        Future {
          BadRequest
        }
      }
    }

  }

  def get(id: Long) = silhouette.SecuredAction.async { implicit request =>
    storyRepository.get(id).flatMap(maybeStory => {
      maybeStory match {
        case Some(story) => {
          projectStageRepository.getProjectForStage(story.stageId)
            .map(maybeProject => {
              maybeProject match {
                case Some(project) => {

                    Ok(Json.toJson(GetStory(story.id, story.name, story.description,
                      story.assigneeId, project.teamId)))

                }
                case None => NotFound
              }
            })
        }
        case None => Future { NotFound }
      }
    })
  }

  def getByStageId(stageId: Long) = silhouette.SecuredAction.async { implicit request =>
    storyRepository.getByStageId(stageId) map {
      story =>
        Ok(Json.toJson(story))
    }
  }

  def update(id: Long) = silhouette.SecuredAction.async { implicit request: Request[AnyContent] =>
    val content = request.body
    val jsonObject = content.asJson
    val updateStoryDto: Option[UpdateStory] =
      jsonObject.flatMap(
        Json.fromJson[UpdateStory](_).asOpt
      )
    updateStoryDto match {
      case Some(dto) => storyRepository.update(id, dto.name, dto.description, dto.assigneeId).map(count => {
        count match {
          case 1 => Ok("updated story")
          case _ => InternalServerError
        }
      })
      case None => Future { BadRequest }
    }

  }
  def delete = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("delete story")
  }

}
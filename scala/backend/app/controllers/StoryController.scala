package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.dto.AddStory
import model.story.StoryRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class StoryController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                                storyRepository: StoryRepository) extends BaseController {

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

  def get = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("get story")
  }

  def getByStageId(stageId: Long) = silhouette.SecuredAction.async { implicit request =>
    storyRepository.getByStageId(stageId) map {
      story =>
        Ok(Json.toJson(story))
    }
  }

  def update = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("update story")
  }
  def delete = silhouette.SecuredAction { implicit request: Request[AnyContent] =>
    Ok("delete story")
  }

}
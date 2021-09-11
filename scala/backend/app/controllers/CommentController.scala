package controllers

import com.mohiva.play.silhouette.api.Silhouette
import model.comment.CommentRepository
import model.commenttask.CommentTaskRepository
import model.dto.AddComment
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, BaseController, ControllerComponents, Request}
import security.environment.CookieEnv

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class CommentController @Inject()(silhouette: Silhouette[CookieEnv], val controllerComponents: ControllerComponents,
                                  commentRepository: CommentRepository,
                                  commentTaskRepository: CommentTaskRepository
                                 ) extends BaseController {

  def create = silhouette.SecuredAction.async { implicit request =>
    val identity = request.identity
    def userId = identity.userID

    val content = request.body
    val jsonObject = content.asJson
    val addCommentDto: Option[AddComment] =
      jsonObject.flatMap(
        Json.fromJson[AddComment](_).asOpt
      )
    addCommentDto match {
      case Some(comment) => {
        commentRepository.create(comment.content, userId).flatMap(res => {
          commentTaskRepository.create(res.id, comment.taskId).map(_ => {
            Ok(Json.toJson(res))
          })
        })
      }
      case None => Future { BadRequest }
    }
  }

  def getForTaskId(taskId: Long)  = silhouette.SecuredAction.async { implicit request =>
    commentTaskRepository.getCommentIdForTask(taskId).flatMap(commentIdList => {
      commentRepository.getByIdList(commentIdList).map(comments => {
        Ok(Json.toJson(comments))
      })
    })
  }

}
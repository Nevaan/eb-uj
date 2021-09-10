package model.commenttask

import play.api.libs.json.Json

case class CommentTask(commentId: Long, taskId: Long)

object CommentTask {
  implicit val format = Json.format[CommentTask]
}
package model.dto

import play.api.libs.json.Json

case class AddComment(taskId: Long, content: String)

object AddComment {
  implicit val format = Json.format[AddComment]
}
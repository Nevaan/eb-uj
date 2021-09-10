package model.comment

import play.api.libs.json.Json

case class Comment(id: Long, content: String, authorId: String)

object Comment {
  implicit val format = Json.format[Comment]
}
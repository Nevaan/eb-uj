package model.dto

import play.api.libs.json.Json

case class GetComment(id: Long, content: String, author: String)

object GetComment {
  implicit val format = Json.format[GetComment]
}
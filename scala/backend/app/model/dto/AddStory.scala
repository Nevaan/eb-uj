package model.dto

import play.api.libs.json.Json

case class AddStory(name: String, description: String, stageId: Long)

object AddStory {
  implicit val addProjectFormat = Json.format[AddStory]
}

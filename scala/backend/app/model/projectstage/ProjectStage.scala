package model.projectstage

import play.api.libs.json.Json

case class ProjectStage(id: Long, description: String, projectId: Long)

object ProjectStage {
  implicit val format = Json.format[ProjectStage]
}

package model.dto

import play.api.libs.json.Json

case class UpdateTeam(name: String, description: String)

object UpdateTeam {
  implicit val updateProjectFormat = Json.format[UpdateTeam]
}

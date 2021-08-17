package model.dto

import play.api.libs.json.Json

case class AddTeam(name: String, description: String)

object AddTeam {
  implicit val addTeamFormat = Json.format[AddTeam]
}
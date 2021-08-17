package model.team

import play.api.libs.json.Json

case class Team(id: Long, name: String, description: String)

object Team {
  implicit val format = Json.format[Team]
}
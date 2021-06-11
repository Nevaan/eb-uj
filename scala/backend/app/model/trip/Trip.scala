package model.trip

import play.api.libs.json.Json

case class Trip(id: Long, name: String, description: String)

object Trip {
  implicit val tripFormat = Json.format[Trip]
}

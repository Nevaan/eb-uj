package model.dto

import play.api.libs.json.Json

import play.api.libs.json.{__, Reads}
import play.api.libs.functional.syntax._

case class NewTrip(name: String, description: String)

object NewTrip {
  //  implicit val newTripFormat = Json.format[NewTrip]

  implicit val readsNewTrip: Reads[NewTrip] = (
    ((__ \ "name").read[String]) and
      ((__ \ "description").read[String])
    ) (NewTrip.apply _)

}


package model.user

import com.mohiva.play.silhouette.api.{Identity, LoginInfo}

import java.util.UUID

case class User(userID: String,
                firstName: Option[String],
                lastName: Option[String],
                fullName: Option[String],
                email: Option[String],
                avatarURL: Option[String]) extends Identity

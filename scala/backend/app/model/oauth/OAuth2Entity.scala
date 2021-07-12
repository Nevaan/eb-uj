package model.oauth

case class OAuth2Entity(
                   providerId: String,
                   providerKey: String,
                   accessToken: String,
                   tokenType: Option[String],
                   expiresIn: Option[Int],
                   refreshToken: Option[String],
                   params: Map[String, String]
                 )

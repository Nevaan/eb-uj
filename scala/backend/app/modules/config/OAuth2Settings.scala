package modules.config

import com.mohiva.play.silhouette.impl.providers.{ OAuth2Settings => OriginalOAuth2Settings }
import com.typesafe.config.Config
import play.api.ConfigLoader

import scala.jdk.CollectionConverters.CollectionHasAsScala

object OAuth2Settings {
  implicit val oauth2ConfigLoader: ConfigLoader[OriginalOAuth2Settings] = (rootConfig: Config, path: String) => {
    val config = rootConfig.getConfig(path)
    val authorizationParams = config.getConfig("authorizationParams")
    val accessTokenParams = config.getConfig("accessTokenParams")
    val customProperties = config.getConfig("customProperties")

    OriginalOAuth2Settings(
      Some(config.getString("authorizationURL")),
      config.getString("accessTokenURL"),
      Some(config.getString("redirectURL")),
      Some(config.getString("apiURL")),
      config.getString("clientID"),
      config.getString("clientSecret"),
      Some(config.getString("scope")),

      authorizationParams.entrySet().asScala.map {
        entry => (entry.getKey, authorizationParams.getString(entry.getKey))
      }.toMap,
      accessTokenParams.entrySet().asScala.map {
        entry => (entry.getKey, accessTokenParams.getString(entry.getKey))
      }.toMap,
      customProperties.entrySet().asScala.map {
        entry => (entry.getKey, customProperties.getString(entry.getKey))
      }.toMap
    )
  }

}

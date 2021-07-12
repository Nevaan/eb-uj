package modules.config

import com.mohiva.play.silhouette.impl.providers.state.{CsrfStateSettings => OriginalCsrfStateSettings}
import com.typesafe.config.{Config, ConfigException}
import play.api.ConfigLoader
import play.api.mvc.Cookie

import scala.concurrent.duration.{Duration, FiniteDuration, MINUTES}

object CsrfStateSettings {
  implicit val csrfStateConfigLoader: ConfigLoader[OriginalCsrfStateSettings] = (rootConfig: Config, path: String) => {
    val config = rootConfig.getConfig(path)
    OriginalCsrfStateSettings(
      config.getString("cookieName"),
      config.getString("cookiePath"),
      try {
        Some(config.getString("cookieDomain"))
      } catch {
        case _ : Throwable => None
      },
      config.getBoolean("secureCookie"),
      config.getBoolean("httpOnlyCookie"),
      Some(config.getString("sameSite") match {
        case "lax" => Cookie.SameSite.Lax
        case "strict" => Cookie.SameSite.Strict
        case "none" => Cookie.SameSite.None
      }),
      FiniteDuration(Duration(config.getString("expirationTime")).toMinutes, MINUTES)
    )
  }
}

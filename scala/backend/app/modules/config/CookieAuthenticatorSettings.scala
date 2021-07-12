package modules.config

import com.mohiva.play.silhouette.impl.authenticators.{CookieAuthenticatorSettings => OriginalCookieAuthenticatorSettings}
import com.typesafe.config.Config
import play.api.ConfigLoader
import play.api.mvc.Cookie

import scala.concurrent.duration.{Duration, FiniteDuration, MINUTES}

object CookieAuthenticatorSettings {
  implicit val cookieAuthConfigLoader: ConfigLoader[OriginalCookieAuthenticatorSettings] = (rootConfig: Config, path: String) => {
    val config = rootConfig.getConfig(path)
    OriginalCookieAuthenticatorSettings(
      config.getString("cookieName"),
      config.getString("cookiePath"),
      if (config.hasPath("cookieDomain")) Some(config.getString("cookieDomain")) else None,
      config.getBoolean("secureCookie"),
      config.getBoolean("httpOnlyCookie"),
      if (config.hasPath("sameSite")) Some(config.getString("sameSite") match {
        case "lax" => Cookie.SameSite.Lax
        case "strict" => Cookie.SameSite.Strict
        case "none" => Cookie.SameSite.None
      }) else None,
      config.getBoolean("useFingerprinting"),
      if (config.hasPath("cookieMaxAge")) Some(FiniteDuration(Duration(config.getString("cookieMaxAge")).toMinutes, MINUTES)) else None,
      if (config.hasPath("authenticatorIdleTimeout")) Some(FiniteDuration(Duration(config.getString("authenticatorIdleTimeout")).toMinutes, MINUTES)) else None,
      FiniteDuration(Duration(config.getString("authenticatorExpiry")).toMinutes, MINUTES)
    )
  }
}

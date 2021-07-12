package modules.config

import com.mohiva.play.silhouette.crypto.{JcaSignerSettings => OriginalJcaSignerSettings}
import com.typesafe.config.Config
import play.api.ConfigLoader

object JcaSignerSettings {
  implicit val jcaSignerConfigLoader: ConfigLoader[OriginalJcaSignerSettings] = (rootConfig: Config, path: String) => {
    val config = rootConfig.getConfig(path)
      OriginalJcaSignerSettings(
        config.getString("key"),
        config.getString("pepper"),
      )
    }
}

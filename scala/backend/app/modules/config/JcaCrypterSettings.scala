package modules.config

import com.mohiva.play.silhouette.crypto.{ JcaCrypterSettings => OriginalJcaCrypterSettings }
import com.typesafe.config.Config
import play.api.ConfigLoader


object JcaCrypterSettings {
  implicit val jcaCrypterConfigLoader: ConfigLoader[OriginalJcaCrypterSettings] = (rootConfig: Config, path: String) => {
    val config = rootConfig.getConfig(path)
    OriginalJcaCrypterSettings(
      config.getString("key")
    )
  }
}

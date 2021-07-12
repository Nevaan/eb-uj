package model.user.service

import com.mohiva.play.silhouette.api.services.IdentityService
import com.mohiva.play.silhouette.impl.providers.CommonSocialProfile
import model.user.User

import java.util.UUID
import scala.concurrent.Future

trait UserService extends IdentityService[User]{
  def retrieve(id: String): Future[Option[User]]
  def save(profile: CommonSocialProfile): Future[User]
}

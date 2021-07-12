package model.user.service

import com.google.inject.Inject
import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.impl.providers.{CommonSocialProfile, OAuth2Info}
import model.user.User
import model.user.repo.{UserRepository, UserRepositoryImpl}

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

class UserServiceImpl @Inject()(userRepo: UserRepository)(implicit ex: ExecutionContext) extends UserService {

  def retrieve(id: String): Future[Option[User]] = userRepo.find(id)
  override def retrieve(loginInfo: LoginInfo): Future[Option[User]] = retrieve(loginInfo.providerKey)

  def save(profile: CommonSocialProfile): Future[User] = {
    retrieve(profile.loginInfo.providerKey).flatMap {
      case Some(user) => {
        val userUpdate = User(user.userID, user.firstName, user.lastName, user.fullName, user.email, user.avatarURL)
        userRepo.update(userUpdate)
      }
      case None =>
        val userUpdate = User(profile.loginInfo.providerKey, profile.firstName, profile.lastName, profile.fullName, profile.email, profile.avatarURL)
        val res = userRepo.save(userUpdate)
        res
    }
  }

}

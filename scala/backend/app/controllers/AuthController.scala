package controllers

import com.mohiva.play.silhouette.api.LoginEvent
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.impl.providers.{CommonSocialProfileBuilder, SocialProvider, SocialProviderRegistry}
import model.user.User
import play.api.Logger
import play.api.libs.json.{Json, Writes}
import play.api.mvc.{Action, AnyContent, Request}

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class AuthController @Inject() (scc: DefaultSilhouetteControllerComponents,
                                configuration: play.api.Configuration,
                                socialProviderRegistry: SocialProviderRegistry
                               )(implicit ex: ExecutionContext) extends SilhouetteController(scc) {
  override val logger = Logger(this.getClass)

  implicit val userWrites: Writes[User] = Writes { user =>
    Json.obj(
      "email" -> user.email,
      "firstName" -> user.firstName,
      "lastName" -> user.lastName,
      "fullName" -> user.fullName,
      "avatarURL" -> user.avatarURL
    )
  }

  def loginPage() = Action {
    Redirect(configuration.get[String]("ebuj.authRedirect"))
  }

  def auth() = Action.async {
    val redirectUrl = configuration.get[String]("ebuj.succesfullAuthUrl")
    implicit request: Request[AnyContent] =>
    (socialProviderRegistry.get[SocialProvider]("github") match {
      case Some(p: SocialProvider with CommonSocialProfileBuilder) =>
        p.authenticate().flatMap {
          case Left(result) => Future.successful(result)
          case Right(authInfo) => for {
            profile <- p.retrieveProfile(authInfo)
            user <- userService.save(profile)
            authInfo <- authInfoRepository.save(profile.loginInfo, authInfo)
            authenticator <- authenticatorService.create(profile.loginInfo)
            value <- authenticatorService.init(authenticator)
            result <- authenticatorService.embed(value, Redirect(redirectUrl))
          } yield {
            eventBus.publish(LoginEvent(user, request))
            logger.info(s"Redirect url: ${redirectUrl}")
            result
          }
        }
      case _ => Future.failed(new ProviderException("Cannot authenticate with unexpected social provider github"))
    }).recover {
      case e: ProviderException =>
        Forbidden("Forbidden")
    }
  }

  def profile = silhouette.SecuredAction { implicit request =>
    val identity = request.identity
    Ok(Json.toJson(identity))
  }

}

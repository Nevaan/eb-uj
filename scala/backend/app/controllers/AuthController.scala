package controllers

import com.mohiva.play.silhouette.api.LoginEvent
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.impl.providers.{CommonSocialProfileBuilder, SocialProvider, SocialProviderRegistry}
import play.api.Logger
import play.api.mvc.{AnyContent, Request}

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class AuthController @Inject() (scc: DefaultSilhouetteControllerComponents,
                                configuration: play.api.Configuration,
                                socialProviderRegistry: SocialProviderRegistry
                               )(implicit ex: ExecutionContext) extends SilhouetteController(scc) {
  override val logger = Logger(this.getClass)

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

}

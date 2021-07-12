package controllers

import com.mohiva.play.silhouette.api.actions.{SecuredActionBuilder, UnsecuredActionBuilder}
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.AuthenticatorService
import com.mohiva.play.silhouette.api.util.{Clock}
import com.mohiva.play.silhouette.api.{EventBus, Silhouette}
import com.mohiva.play.silhouette.impl.providers.{SocialProviderRegistry}
import model.user.service.UserService

import javax.inject.Inject
import play.api.Logging
import play.api.http.FileMimeTypes
import play.api.i18n.{I18nSupport, Langs, MessagesApi}
import play.api.mvc._
import security.environment.CookieEnv

abstract class SilhouetteController(override protected val controllerComponents: SilhouetteControllerComponents)
  extends MessagesAbstractController(controllerComponents) with SilhouetteComponents with I18nSupport with Logging {

  def securedAction: SecuredActionBuilder[EnvType, AnyContent] = controllerComponents.silhouette.SecuredAction

  def unsecuredAction: UnsecuredActionBuilder[EnvType, AnyContent] = controllerComponents.silhouette.UnsecuredAction

  def userService: UserService = controllerComponents.userService

  def authInfoRepository: AuthInfoRepository = controllerComponents.authInfoRepository

  def clock: Clock = controllerComponents.clock

  def silhouette: Silhouette[EnvType] = controllerComponents.silhouette

  def authenticatorService: AuthenticatorService[AuthType] = silhouette.env.authenticatorService

  def eventBus: EventBus = silhouette.env.eventBus

  def socialProviderRegistry: SocialProviderRegistry = controllerComponents.socialProviderRegistry
}

trait SilhouetteComponents {
  type EnvType = CookieEnv
  type AuthType = EnvType#A
  type IdentityType = EnvType#I

  def userService: UserService

  def authInfoRepository: AuthInfoRepository

  def clock: Clock

  def silhouette: Silhouette[EnvType]

  def socialProviderRegistry: SocialProviderRegistry
}

trait SilhouetteControllerComponents extends MessagesControllerComponents with SilhouetteComponents

final case class DefaultSilhouetteControllerComponents @Inject()(
                                                                  silhouette: Silhouette[CookieEnv],
                                                                  userService: UserService,
                                                                  authInfoRepository: AuthInfoRepository,
                                                                  clock: Clock,
                                                                  messagesActionBuilder: MessagesActionBuilder,
                                                                  actionBuilder: DefaultActionBuilder,
                                                                  parsers: PlayBodyParsers,
                                                                  messagesApi: MessagesApi,
                                                                  langs: Langs,
                                                                  fileMimeTypes: FileMimeTypes,
                                                                  executionContext: scala.concurrent.ExecutionContext,
                                                                  socialProviderRegistry: SocialProviderRegistry
                                                                ) extends SilhouetteControllerComponents
package filter

import akka.util.ByteString
import play.api.Logging
import play.api.http.{HeaderNames, HttpVerbs}
import play.api.libs.streams.Accumulator
import play.api.mvc.{EssentialAction, RequestHeader, Result}
import play.filters.cors.CORSFilter

import java.net.URI
import java.util.Locale

class AppCorsFilter extends CORSFilter {


  override protected def filterRequest(next: EssentialAction, request: RequestHeader): Accumulator[ByteString, Result] = {

    val resultAcc = (request.headers.get(HeaderNames.ORIGIN), request.method) match {
      case (None, _) =>
        /* http://www.w3.org/TR/cors/#resource-requests
         * § 6.1.1
         * If the Origin header is not present terminate this set of steps.
         */
        logger.info("None found")
      case (Some(originHeader), _) => {
        logger.info("Some origin header")
        logger.info(s"originHeader: ${originHeader}")
        val hostUri   = new URI(originHeader.toLowerCase(Locale.ENGLISH))
        val originUri = new URI((if (request.secure) "https://" else "http://") + request.host.toLowerCase(Locale.ENGLISH))
        logger.info(s"isSameOrigin: (${hostUri.getScheme}, ${hostUri.getHost}, ${hostUri.getPort}) (${originUri.getScheme}, ${originUri.getHost}, ${originUri.getPort}")
      }
      case (_, HttpVerbs.OPTIONS) =>
        // Check for preflight request
        request.headers.get(HeaderNames.ACCESS_CONTROL_REQUEST_METHOD) match {
          case None =>
            logger.info("None options access control request - handling cors request")
          case Some("") =>
            logger.info("Empty options access control request - invalid cors")
          case _ =>
            logger.info("Other options access control request - handling preflight")
        }
      case (_, method) =>
        logger.info(s"method type: ${method}")
      case _ =>
        // unrecognized method so invalid request
        logger.info("Unrecognized method!")
    }

    super.filterRequest(next, request)
  }
}

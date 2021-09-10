package filter

import javax.inject.Inject
import akka.util.ByteString
import play.api.{Logger, Logging}
import play.api.libs.streams.Accumulator
import play.api.mvc._

import scala.concurrent.ExecutionContext

class LoggingFilter @Inject() (implicit ec: ExecutionContext) extends EssentialFilter with Logging {
  def apply(nextFilter: EssentialAction) = new EssentialAction {
    def apply(requestHeader: RequestHeader) = {
      val startTime = System.currentTimeMillis

      val accumulator: Accumulator[ByteString, Result] = nextFilter(requestHeader)

      accumulator.map { result =>
        val endTime     = System.currentTimeMillis
        val requestTime = endTime - startTime

        logger.info(
          s"${requestHeader.method} ${requestHeader.uri} took ${requestTime}ms and returned ${result.header.status}"
        )

        logger.info("Request headers: ")
        requestHeader.headers.headers.map {
          x => logger.info(s"\t${x}")
        }

        result
      }
    }
  }
}
import {
  Catch,
  HttpStatus,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { LoggerProvider } from '@infra/adapters/logger';
import { ENVIRONMENT } from '@domain/common/constants/envs';
interface ValidationPipeError {
  response: {
    message: string[];
  };
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private loggerProvider: LoggerProvider) {}

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    let detail = [];
    let status;
    const exceptionToHTTPStatusMap = {
      BadRequestException: HttpStatus.BAD_REQUEST,
      PaymentMethodSetupNotAllowedException: HttpStatus.BAD_REQUEST,
      InvalidCheckoutStatusException: HttpStatus.BAD_REQUEST,
      CheckoutInformationUnavailableException: HttpStatus.INTERNAL_SERVER_ERROR,
      ComplementaryOptionNotAllowedException: HttpStatus.BAD_REQUEST,
      PaymentMethodNotAllowedPerCountryException: HttpStatus.BAD_REQUEST,
      PaymentMethodNotAllowedException: HttpStatus.BAD_REQUEST,
      FintechTransactionUnavailableException: HttpStatus.INTERNAL_SERVER_ERROR,
      CreateSessionException: HttpStatus.INTERNAL_SERVER_ERROR,
      GamificationPointsUnavailableException: HttpStatus.INTERNAL_SERVER_ERROR,
      StoreBalanceUnavailableException: HttpStatus.INTERNAL_SERVER_ERROR,
      PaymentGenerationException: HttpStatus.INTERNAL_SERVER_ERROR,
      PaymentGenerationV2Exception: HttpStatus.INTERNAL_SERVER_ERROR,
      StatusNequiUnavailableException: HttpStatus.INTERNAL_SERVER_ERROR,
      TreintaWebhookException: HttpStatus.INTERNAL_SERVER_ERROR,
      TrackEventBrazeException: HttpStatus.INTERNAL_SERVER_ERROR,
      GenerateAuthTokenNequiException: HttpStatus.INTERNAL_SERVER_ERROR,
      GenerateNewSubscriptionNequiException: HttpStatus.INTERNAL_SERVER_ERROR,
      GamificationBannerInfoUnavailableException:
        HttpStatus.INTERNAL_SERVER_ERROR,
      SaveCheckoutException: HttpStatus.INTERNAL_SERVER_ERROR,
      UpdatingCheckoutException: HttpStatus.INTERNAL_SERVER_ERROR,
      RegisterReturnUrlException: HttpStatus.INTERNAL_SERVER_ERROR,
      SaveReturnUrlException: HttpStatus.INTERNAL_SERVER_ERROR,
      RefundBagPaymentException: HttpStatus.INTERNAL_SERVER_ERROR,
      ConsultingPaymentMethodException: HttpStatus.NOT_FOUND,
      NotFoundReturnUrlException: HttpStatus.NOT_FOUND,
      ConsultingPaymentMethodPerCountryException: HttpStatus.NOT_FOUND,
      ConsultingReturnUrlException: HttpStatus.NOT_FOUND,
      ConsultingStatusException: HttpStatus.NOT_FOUND,
      FindCheckoutException: HttpStatus.NOT_FOUND,
      FindReturnUrlException: HttpStatus.NOT_FOUND,
      ConsultingCheckoutException: HttpStatus.NOT_FOUND,
    };
    status =
      exceptionToHTTPStatusMap[exception.name] ??
      HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    if (exception instanceof BadRequestException) {
      detail = (exception as unknown as ValidationPipeError).response.message;
    }
    const { url, params, body } = request;
    const log = {
      url,
      statusCode: status,
      environment: ENVIRONMENT,
      bodyParams: body || params,
      message: exception.message,
      stackTrace: exception.stack,
      detail,
    };

    this.loggerProvider.error(log);

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
      detail,
      path: url,
    });
  }
}

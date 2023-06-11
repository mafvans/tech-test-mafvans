import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerProvider } from '@infra/adapters/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggerProvider: LoggerProvider) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const startDate = new Date();
    const { method, url, params, body, user } = request;
    if (url === '/') {
      return;
    }
    const defaultData = {
      userUID: user?.uid,
      endpointType: method,
      endpointUrl: url,
      environment: process.env.ENVIRONMENT,
      bodyParams: body || params,
      message: `${method} '${url}'`,
    };
    if (method && url) {
      this.loggerProvider.log(defaultData);
    }

    return next.handle().pipe(
      tap(() => {
        if (method && url) {
          this.loggerProvider.log({
            ...defaultData,
            message: `${method} '${url}' successfully`,
            timeExecuted: Math.abs(
              (new Date().getTime() - startDate.getTime()) / 1000,
            ),
          });
        }
      }),
    );
  }
}

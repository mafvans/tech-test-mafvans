import { json } from 'body-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { LoggerProvider } from '@infra/adapters/logger';
import { AllExceptionsFilter, LoggingInterceptor } from '@infra/commons';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT_HTTP');
  const environment = configService.get('ENVIRONMENT');

  const loggerProvider = new LoggerProvider();

  app.useGlobalInterceptors(new LoggingInterceptor(loggerProvider));
  app.useGlobalFilters(new AllExceptionsFilter(loggerProvider));

  app.enableCors();
  app.use(json({ limit: process.env.REQUEST_LIMIT }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(port);
  await app.startAllMicroservices();
  logger.log(
    `MICROSERVICE ready to receive requests - ENVIRONMENT ${environment} and PORT ${port}`,
  );
}

bootstrap();

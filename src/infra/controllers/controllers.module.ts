import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule, LoggerProvider } from '@infra/adapters/logger';
import { IntegrationController } from '@infra/controllers/integration';
import { IntegrationUsesCasesProxyModule } from '@infra/usecases-proxy';

@Module({
  providers: [LoggerProvider],
  imports: [
    IntegrationUsesCasesProxyModule.register(),
    ConfigModule,
    LoggerModule,
  ],
  controllers: [IntegrationController],
})
export class ControllersModule {}

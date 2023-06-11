import { Module } from '@nestjs/common';
import { LoggerClientAdapter } from '@infra/adapters/logger';

@Module({
  providers: [LoggerClientAdapter],
  exports: [LoggerClientAdapter],
})
export class LoggerModule {}

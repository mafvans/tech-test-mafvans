/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { LoggerInput, LoggerClientPort } from '@application/ports';
import { LoggerProvider } from './logger-provider';

@Injectable()
export class LoggerClientAdapter implements LoggerClientPort {
  private logger = new LoggerProvider();
  info(payload: LoggerInput): void {
    this.logger.log(payload);
  }

  warn(payload: LoggerInput): void {
    this.logger.warn(payload);
  }

  error(payload: LoggerInput): void {
    this.logger.error(payload);
  }
}

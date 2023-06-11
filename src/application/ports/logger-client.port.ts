/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

export type LoggerInput = {
  action?: string;
  useCase?: string;
  msg?: string;
};

export abstract class LoggerClientPort {
  abstract info(input: LoggerInput): void;
  abstract warn(input: LoggerInput): void;
  abstract error(input: LoggerInput): void;
}

import { createLogger, format, transports } from 'winston';

export class LoggerProvider {
  private readonly logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console()],
    });
  }

  log(message: object): void {
    this.logger.info(this.parseMessage(message));
  }

  error(message: object): void {
    this.logger.error(this.parseMessage(message));
  }

  warn(message: object): void {
    this.logger.warn(this.parseMessage(message));
  }

  private parseMessage(message: object): string {
    return JSON.stringify(message);
  }
}

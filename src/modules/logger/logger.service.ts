import { Injectable, Scope, LoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import { createLogger, format, transports } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService implements LoggerService {
  private readonly logger: Logger;
  private context: string;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, context }) => {
          return `${timestamp} [${level}] [${context}] ${message}`;
        }),
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' }),
      ],
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: string) {
    this.logger.info(message, { context: this.context });
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace, context: this.context });
  }

  warn(message: string) {
    this.logger.warn(message, { context: this.context });
  }

  debug(message: string) {
    this.logger.debug(message, { context: this.context });
  }

  verbose(message: string) {
    this.logger.verbose(message, { context: this.context });
  }
}

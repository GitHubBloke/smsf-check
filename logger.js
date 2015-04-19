import winston from 'winston';
import Sentry from 'winston-sentry';

const transports = [
  new (winston.transports.Console)({
    colorize: true,
    timestamp: true,
  }),
];

if (process.env.SENTRY_DSN) {
  transports.push(new Sentry({ dsn: process.env.SENTRY_DSN }));
}

export default new (winston.Logger)({ transports });

import morgan from 'morgan';
import logger from '../utils/logger';

const morganMiddleware = morgan(
  ':method :url :remote-addr :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);

export default morganMiddleware;
import morgan from 'morgan';
import { logger } from '../common';

const morganMiddleware = morgan(
    function (tokens, req, res) {
        return JSON.stringify({
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            status: Number.parseFloat(tokens.status(req, res)),
            content_length: tokens.res(req, res, 'content-length'),
            response_time: Number.parseFloat(tokens['response-time'](req, res)),
        });
    },
    {
        stream: {
            // Configure Morgan to use our custom logger with the various severity
            write: (message) => {
                const data = JSON.parse(message);
                if (data.status >= 200 && data.status <= 226) {
                    return logger.info(`${message}`);
                }
                else if (data.status >= 400 && data.status <= 431) {
                    return logger.warn(`${message}`);
                }
                else {
                    return logger.error(`${message}`);
                }
            },
        },
    }
);

// const morganMiddleware = morgan(
//     ':method :url :status :res[content-length] - :response-time ms',
//     {
//         stream: {
//             // Configure Morgan to use our custom logger with the http severity
//             write: (message) => logger.info(message.trim()),
//         },
//     }
// );

export default morganMiddleware;
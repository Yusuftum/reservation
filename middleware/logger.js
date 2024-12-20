const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Log formatını tanımlayın
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// Logger'ı oluşturun
const logger = createLogger({
    format: combine(
        label({ label: 'my-app' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ]
});

// Middleware fonksiyonunu oluşturun
const logMiddleware = (req, res, next) => {
    const logDetails = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
        ip: req.ip
    };
    logger.info(`Request: ${JSON.stringify(logDetails)}`);
    next();
};

// Hata yakalama ve loglama middleware'i
const errorHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).send('Sunucu Hatası');
};

module.exports = { logMiddleware, errorHandler };

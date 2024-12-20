const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: 'Bu IP adresinden çok fazla giriş denemesi yapıldı, lütfen 15 dakika sonra tekrar deneyin.'
});

module.exports = loginLimiter;

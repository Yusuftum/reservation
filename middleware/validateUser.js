const { check, validationResult } = require('express-validator');

exports.validateUser = [
    check('username').notEmpty().withMessage('Kullanıcı adı gereklidir'),
    check('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır'),
    check('phoneNumber').isMobilePhone().withMessage('Geçerli bir telefon numarası gereklidir'),
    check('creditCard').isCreditCard().withMessage('Geçerli bir kredi kartı numarası gereklidir'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

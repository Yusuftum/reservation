const { check, validationResult } = require('express-validator');

exports.validateReservation = [
    check('name').notEmpty().withMessage('İsim gereklidir'),
    check('date').isISO8601().withMessage('Geçerli bir tarih gereklidir'),
    check('partySize').isInt({ min: 1 }).withMessage('Grup boyutu 1 veya daha büyük olmalıdır'),
    check('phoneNumber').isMobilePhone().withMessage('Geçerli bir telefon numarası gereklidir'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Yetkisiz erişim: Admin yetkisi gerekli.' });
    }
};

const userMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        next();
    } else {
        res.status(403).json({ message: 'Yetkisiz erişim: Kullanıcı yetkisi gerekli.' });
    }
};

module.exports = { adminMiddleware, userMiddleware };

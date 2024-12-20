const jwt = require('jsonwebtoken');
const User = require('../models/User');
const argon2 = require('argon2');

exports.register = async (req, res) => {
    const { username, password, phoneNumber, creditCard } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu kullanıcı adı zaten kullanılıyor.' });
        }

        const existingPhone = await User.findOne({ phoneNumber });
        if (existingPhone) {
            return res.status(400).json({ message: 'Bu telefon numarası zaten kullanılıyor.' });
        }

        const user = new User({ username, password, phoneNumber, creditCard });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Kullanıcı oluşturulamadı', error: error.message || error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Giriş yapılamadı', error: error.message || error });
    }
};

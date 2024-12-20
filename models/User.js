const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    creditCard: { type: String, required: true },
    role: { type: String, default: 'user' } 
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await argon2.hash(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    try {
        return await argon2.verify(this.password, enteredPassword);
    } catch (err) {
        throw new Error('Şifre doğrulaması yapılamadı');
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;

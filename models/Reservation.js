const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    partySize: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true }, 
    amount: { type: Number, default: 300 }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

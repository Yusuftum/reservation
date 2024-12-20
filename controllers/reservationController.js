const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).send(newReservation);
    } catch (error) {
        res.status(400).json({ message: 'Geçersiz İstek', error });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reservation) {
            return res.status(404).json({ message: 'Rezervasyon Bulunamadı' });
        }
        res.send(reservation);
    } catch (error) {
        res.status(400).json({ message: 'Geçersiz İstek', error });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Rezervasyon Bulunamadı' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Sunucu Hatası', error });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu Hatası', error });
    }
};

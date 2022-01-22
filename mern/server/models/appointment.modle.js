const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    firstName: {
        type: String,
        requred: true,
    },
    lastName: {
        type: String,
        requred: true,
    },
    email: {
        type: String,
        requred: true
    },
    service: {
        type: String,
        requred: true
    },
    date: {
        type: Date,
        requred: true
    },
    time: {
        type: String,
        requred: true
    },
    employeeName: {
        type: String,
        requred: true
    }
    
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
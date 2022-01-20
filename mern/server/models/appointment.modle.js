const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    //lastName: {
    //    type: String,
    //    required: true
    //},
    //availableDays: [
    //    {
    //        date: Date,
    //        times: [String]
    //    }
    //],
    //bookedDays: [
    //    {
    //        date: Date,
    //        times: [String]
    //    }
    //],
    //appointments:[
    //    {
    //        service: String,
    //        employee: String,
    //        date: Date,
    //        time: String
    //    }
    //]
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
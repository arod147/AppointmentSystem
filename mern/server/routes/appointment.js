const express = require('express')

const appointmentRoutes = express.Router();

let Appointment = require('../models/appointment.modle');

//This will get a list of all date in the appointment table
appointmentRoutes.route('/fullAppointments').get((req, res) => {
    Appointment.find({}, (err, result) => {
        if (err) throw err
        res.json(result);
    });
});

appointmentRoutes.route('/addSchdule').post((req, response) => {
    console.log(req.body)
    Appointment.insertMany(req.body.map(current => {
        return {
            firstName: current.name,
            age: current.age,
        }
    }), (err, res) => {
        if (err) throw err;
        response.json(res)
    })
})

module.exports = appointmentRoutes;
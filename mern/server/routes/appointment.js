const express = require('express')

const appointmentRoutes = express.Router();

let Appointment = require('../models/appointment.modle');

//This will get a list of all date in the appointment table
appointmentRoutes.route('/appointments').get((req, res) => {
    Appointment.find({}, (err, result) => {
        if (err) throw err
        res.json(result);
    });
});
//Add a new Appointment to database
appointmentRoutes.route('/addAppointment').post((req, response) => {
    Appointment.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        service: req.body.service,
        date: req.body.date,
        time: req.body.time,
        employeeName: req.body.employeeName,
    }, (err, res) => {
        if (err) throw err;
        response.json(res)
    })
})

appointmentRoutes.route('/deleteAppointment').post((req, response) => {
    Appointment.deleteOne({date: req.body.date, time: req.body.time}, {
    }, (err, res) => {
     if (err) throw err;
     response.json(res)
 })
})

//Update schedule in database
//Use conbination of date and time to find appoinemnt
appointmentRoutes.route('/updateAppointment').post((req, response) => {
    Appointment.updateOne({month: req.body.month}, {
        scheduledDays: req.body.scheduledDays
    }, (err, res) => {
        if (err) throw err;
        response.json(res)
    })
})

module.exports = appointmentRoutes;
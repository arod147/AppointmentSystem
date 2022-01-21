const express = require('express')

const scheduleRoutes = express.Router();

let Schedule = require('../models/schedule.modle');

//This will get a list of all date in the appointment table
scheduleRoutes.route('/schedules').get((req, res) => {
    Schedule.find({}, (err, result) => {
        if (err) throw err
        res.json(result);
    });
});
//Add a new schedule to database
scheduleRoutes.route('/addSchedule').post((req, response) => {
    Schedule.create({
        month: req.body.month,
        scheduledDays: req.body.scheduledDays
    }, (err, res) => {
        if (err) throw err;
        response.json(res)
    })
})

//Update schedule in database
scheduleRoutes.route('/updateSchedule').post((req, response) => {
    Schedule.findOneAndUpdate(req.body.month, {
        scheduledDays: req.body.scheduledDays
    }, (err, res) => {
        if (err) throw err;
        response.json(res)
    })
})

module.exports = scheduleRoutes;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    month: {
        type: String,
        requred: true,
        unique: true
    },
    scheduledDays: []
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
const express = require('express');

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with 
// path /user.
const userRoutes = express.Router();

let User = require('../models/user.modle');
// This will help us connect to the database.

// This section will help you get a list of all the users.
userRoutes.route('/user').get((req, res) => {
    User.find({}, (err, result) => {
        if (err) throw err
        res.json(result);
    });
});

//This section will help you verify login info
userRoutes.route('/user/:username/:password').get((req, res) => {
    let myquery = { username: req.params.username, password: req.params.password };
    User.findOne(myquery, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

//This section will help you get a sigle user by username.
userRoutes.route('/user/:username').get((req, res) => {
    console.log(req.params.username)
    let myquery = { username: req.params.username };
    User.findOne(myquery, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you create a new user.
userRoutes.route('/user/add').post((req, response) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.userName,
        password: req.body.passWord,
        email: req.body.email,
        position: req.body.position,
    }, (err, res) => {
        if (err) throw err;
        response.json(res)
    })
});

module.exports = userRoutes;
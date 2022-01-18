const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with 
// path /record.
const exampleRoutes = express.Router();


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
exampleRoutes.route("/record").get(function(req, res) {
    Record.find({}, (err, result) => {
        res.json(result);
    })
});

// This section will help you get a single record by id
exampleRoutes.route("/record/:id").get(function(req, res) {
    let myquery = { _id: ObjectId(req.params.id) };
    Record.findOne(myquery, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you create a new record.
exampleRoutes.route("/record/add").post(function(req, response) {
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    Record.create(myobj, function(err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
exampleRoutes.route("/update/:id").post(function(req, response) {
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    Record.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
    });
});

// This section will help you delete a record
exampleRoutes.route("/:id").delete((req, response) => {
    let myquery = { _id: ObjectId(req.params.id) };
    Record.deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = exampleRoutes;
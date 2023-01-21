const db = require("../models");

const User = db.User;

// Create and Save a new User
exports.create = (req, res) => {
    console.log(req);
    if (!req.body.email) {
        res.status(400).send({ message: "email can not be empty!" });
        return;
    }

    res.status(200).send("done")

    // Create a User
    //   const user = new Tutorial({
    //     email: req.body.email,
    //     password: req.body.password,
    //   });

    //   // Save User in the database
    //   User
    //     .save(user)
    //     .then(data => {
    //       res.send(data);
    //     })
    //     .catch(err => {
    //       res.status(500).send({
    //         message:
    //           err.message || "Some error occurred while creating the user."
    //       });
    //     });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

    console.log("testststaa",req);
    User.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

// Find a single User with an id
exports.findOne = (req, res) => {

};

// Update a User by the id in the request
exports.update = (req, res) => {

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};
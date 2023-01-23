const User = require("../models/userModal");


// Create and Save a new User
exports.create = (req, res) => {
   
      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });

      // Save User in the database
      User
        .save(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user."
          });
        });
};

// Retrieve all Users from the database.
exports.find = async(req, res) => {

    console.log("asdasd");
    xx = await User.find()
    res.status(200).send(xx)

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
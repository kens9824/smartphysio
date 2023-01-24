const User = require("../models/userModal");
const RequestFailed = require('../response/RequestFailedResponse')


// Create and Save a new User
exports.createAdmin = async (req, res) => {


  const {email,password,number,name} = req.body

  if (!email) {
    return RequestFailed(res, 400, "email");
  }
  if (!password) {
    return RequestFailed(res, 400, "password");
  }
  if (!number) {
    return RequestFailed(res, 400, "number");
  }

  if (!name || !name.trim().length) {
    return RequestFailed(res, 400, "name");
  }





  const hashPassword = await bcrypt.hash(password,12)

      const user = new User({
        email: req.body.email,
        password: hashPassword,
        number: number,
        name:name,
        role:"admin"
        
      });

      // Save User in the database
     await user
        .save()
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

exports.createDoctor = async (req, res) => {


  const {email,password,number,name} = req.body

  if (!email) {
    return RequestFailed(res, 400, "email");
  }
  if (!password) {
    return RequestFailed(res, 400, "password");
  }
  if (!number) {
    return RequestFailed(res, 400, "number");
  }

  if (!name || !name.trim().length) {
    return RequestFailed(res, 400, "name");
  }





  const hashPassword = await bcrypt.hash(password,12)

      const user = new User({
        email: req.body.email,
        password: hashPassword,
        number: number,
        name:name,
        role:"doctor"
        
      });

      // Save User in the database
     await user
        .save()
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
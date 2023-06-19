const User = require("../models/userModal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const RequestFailed = require('../response/RequestFailedResponse');
const { createUser, findByRole } = require("../helper/userhelper");
const { responseSuccess } = require("../helper/response");



// Create and Save a new User
exports.signup = async (req, res) => {
  await createUser(req, res, "user")

};

// exports.createPatient = async (req, res) => {

//   await createUser(req, res, "patient")
//   await createPatient(req, res)

// };

// exports.createDoctor = async (req, res) => {

//   const { email, password, number, name } = req.body

//   if (!email) {
//     return RequestFailed(res, 400, "email");
//   }
//   if (!password) {
//     return RequestFailed(res, 400, "password");
//   }
//   if (!number) {
//     return RequestFailed(res, 400, "number");
//   }

//   if (!name || !name.trim().length) {
//     return RequestFailed(res, 400, "name");
//   }

//   const hashPassword = await bcrypt.hash(password, 12)

//   const user = new User({
//     email: req.body.email,
//     password: hashPassword,
//     number: number,
//     name: name,
//     role: "doctor"

//   });

//   // Save User in the database
//   await user
//     .save()
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the user."
//       });
//     });
// };

exports.login = async (req, res) => {


  const { email, password } = req.body

  if (!email) {
    return RequestFailed(res, 400, "email");
  }
  if (!password) {
    return RequestFailed(res, 400, "password");
  }

  const user = await User.findOne({ email: email })
  if (!user) {
    return RequestFailed(res, 401, "user not found");

  } else {
    const isValidate = await bcrypt.compare(password, user.password)

    if (!isValidate) {
      return RequestFailed(res, 401, "bad username/password");
    }
    const data = {
      id: user.id,
      username: user.name,
      role: user.role
    };
    const token = await jwt.sign(data, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });
    const refreshToken = await jwt.sign(
      data,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    if (token) {
      res.status(202).send({ token, refreshToken, user });
    }

  }



};

// Retrieve all Users from the database.
exports.find = async (req, res) => {

  await findByRole(req, res, req.params.role)

};

// Find a single User with an id
exports.findOne = async (req, res) => {
  if (req.params.id) {
    user = await User.findById({ _id: req.params.id })
    if (user) {
       responseSuccess(res, "User fetch successfully",user)

    }
    else {
      return RequestFailed(res, 404, "record not Found");
    }
  }
  else {
    return RequestFailed(res, 404, "Id not Found");

  }

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
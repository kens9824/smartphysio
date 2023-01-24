const User = require("../models/userModal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const RequestFailed = require('../response/RequestFailedResponse')


// Create and Save a new User
exports.createAdmin = async (req, res) => {


  const { email, password, number, name } = req.body

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





  const hashPassword = await bcrypt.hash(password, 12)

  const user = new User({
    email: req.body.email,
    password: hashPassword,
    number: number,
    name: name,
    role: "admin"

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


  const { email, password, number, name } = req.body

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





  const hashPassword = await bcrypt.hash(password, 12)

  const user = new User({
    email: req.body.email,
    password: hashPassword,
    number: number,
    name: name,
    role: "doctor"

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
    };
    const token = await jwt.sign(data, process.env.TOKEN_SECRET,{
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
      res.status(202).send({token, refreshToken, user});
    }

  }



};


exports.createDoctor = async (req, res) => {

  const { email, password, number, name } = req.body

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





  const hashPassword = await bcrypt.hash(password, 12)

  const user = new User({
    email: req.body.email,
    password: hashPassword,
    number: number,
    name: name,
    role: "doctor"

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
exports.find = async (req, res) => {

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
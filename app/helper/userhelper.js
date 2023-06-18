const User = require("../models/userModal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const RequestFailed = require('../response/RequestFailedResponse')


exports.createUser = async (req, res,role) => {
console.log("test");

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
      role: role
  
    });
  
    // Save User in the database
    await user
      .save()
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  };
  

  exports.findByRole = async (req, res,role) => {

    if(role && role != "admin"){
      user = await User.find({role:role})
      res.status(200).send(user)
    }
    else{
      return RequestFailed(res, 409, "You are Not Allowed for this operation");

    }

  
  };
const { NextFunction, Response } = require('express')
const jwt = require('jsonwebtoken')
const RequestFailed = require('../response/RequestFailedResponse')
const User = require("../models/userModal");


const dotenv = require("dotenv");
dotenv.config();


const Auth = async (req, Response, NextFunction) => {
  try {


    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return RequestFailed(Response, 404, "Unauthorized / no token found");
    } else {
      const data = jwt.verify(token, process.env.TOKEN_SECRET);

      user = await User.findById({ _id: data.id })
      if (user) {
        if (user.isActive) {
          req.data = data;
          NextFunction();
        }
        else {
          return RequestFailed(Response, 403, "User is not Active");
        }
      }else{
        return RequestFailed(Response, 404, "User is not found")

      }

    }
  } catch (error) {
    console.log(error);
    return InternalServerError(Response, error);
  }
};

module.exports = Auth

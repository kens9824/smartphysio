const { NextFunction, Response } = require('express')
const jwt = require('jsonwebtoken')
const RequestFailed = require('../response/RequestFailedResponse')
const User = require("../models/userModal");

const InternalServerError = require('../response/InternalServerErrorResponse');

const dotenv = require("dotenv");
dotenv.config();

const IsAdmin = async (req, Response, NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return RequestFailed(Response, 404, "Unauthorized / no token found");
    } else {
      const data = jwt.verify(token, process.env.TOKEN_SECRET);

      user = await User.findById({ _id: data.id })
      if (user) {
        if (user.isActive) {

          if(user.role != "admin"){
            return RequestFailed(Response, 403, "You are not authorised person");
          }
          req.data = data
          NextFunction();
        }
        else {
          return RequestFailed(Response, 403, "User is not Active");
        }
      }

    }
  } catch (error) {
    console.log(error);
    return InternalServerError(Response, error);
  }
};

// const IsPatient = (req, res, NextFunction) => {
//   try {
//     roleCheck(req.data.role,"patient",NextFunction)
//   } catch (error) {
//     return InternalServerError(res, error);
//   }
// };

// const IsDoctor = (req, res, NextFunction) => {
//   try {
//     roleCheck(req.data.role,"doctor",NextFunction)
//   } catch (error) {
//     return InternalServerError(res, error);
//   }
// };




module.exports = {
  IsAdmin
}
const {NextFunction, Response} = require('express')
const jwt = require('jsonwebtoken')
const RequestFailed = require('../response/RequestFailedResponse')

const dotenv = require("dotenv");
dotenv.config();

 
 const Auth = (req, Response, NextFunction) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];      
      if (!token) {
        return RequestFailed(Response, 404, "Unauthorized / no token found");
      } else {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        req.data = data;
  
        NextFunction();
      }
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error);
    }
  };

  module.exports = Auth

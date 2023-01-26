const { NextFunction, Response } = require('express')
const RequestFailed = require('../response/RequestFailedResponse')
const InternalServerError = require('../response/InternalServerErrorResponse');

const dotenv = require("dotenv");
dotenv.config();

const roleCheck =(tokenRole, desireRole,NextFunction)=>{
  if (tokenRole === desireRole) {
    NextFunction();
  } else {
    return RequestFailed(res, 401, "You are not authorized person for this operation");
  }
}

const IsPatient = (req, res, NextFunction) => {
  try {
    roleCheck(req.data.role,"patient",NextFunction)
  } catch (error) {
    return InternalServerError(res, error);
  }
};

const IsDoctor = (req, res, NextFunction) => {
  try {
    roleCheck(req.data.role,"doctor",NextFunction)
  } catch (error) {
    return InternalServerError(res, error);
  }
};

const IsAdmin = (req, res, NextFunction) => {
  try {
    roleCheck(req.data.role,"admin",NextFunction)
  } catch (error) {
    return InternalServerError(res, error);
  }
};


module.exports = {
  IsDoctor,
  IsPatient,
  IsAdmin
}
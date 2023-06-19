const User = require("../models/userModal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const RequestFailed = require('../response/RequestFailedResponse');
const { createUser, findByRole } = require("../helper/userhelper");
const Plateform = require("../models/plateformModal");
const { plateform } = require("../models");
const { responseSuccess } = require("../helper/response");


// Create and Save a new User
exports.createPlateform = async (req, res) => {
  // await createUser(req, res, "user")

  const { name } = req.body


  if (!name || !name.trim().length) {
    return RequestFailed(res, 400, "name");
  }

  const plateform = new Plateform({
    name: name,
  });

  // Save User in the database
  await plateform
    .save()
    .then(data => {
      console.log(data);
      responseSuccess(res, "plateform created successfully",data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });

};

// Retrieve single Users from the database.
exports.findPlateformById = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return RequestFailed(res, 404, "plateform id not found");
    }
    const plateform = await Plateform.findById({ _id: id })
    if (plateform) {
      console.log(plateform);
      responseSuccess(res, "plateform fetch successfully",plateform)
    }
    else {
      return RequestFailed(res, 404, "plateform data not found with this id");

    }


  } catch (error) {
    console.log(error);
    return RequestFailed(res, 500, error);

  }


  // await findByRole(req, res, req.params.role)

};

// Find all Plateform from database
exports.getAllPlateform = async (req, res) => {

  try {
    const plateform = await Plateform.find()
    if (plateform) {
      responseSuccess(res, "plateform list fetch successfully",plateform)
      // res.status(200).send(plateform)
    }

  } catch (error) {
    return RequestFailed(res, 500, error);
  }

};
// Update a plateform by the id in the request
exports.updatePlateform = async (req, res) => {

  try {
    const id = req.params.id
    const { name } = req.body
    if (!id) {
      return RequestFailed(res, 404, "plateform id not found");
    }
    const plateform = await Plateform.findById({ _id: id })
    if (plateform) {

      plateform.name = name
      await plateform
        .save()
        .then(data => {
          console.log(data);
          responseSuccess(res, "plateform update successfully",data)


          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user."
          });
        });

    }
    else {
      return RequestFailed(res, 404, "plateform data not found with this id");

    }

  } catch (error) {
    return RequestFailed(res, 500, error);

  }



};

// Delete a Plateform with the specified id in the request
exports.deletePlateform = async(req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return RequestFailed(res, 404, "plateform id not found");
    }
    const plateform =  await Plateform.deleteOne({ _id: id })
    responseSuccess(res, "plateform delete successfully")


  } catch (error) {
    return RequestFailed(res, 500, error);
  }
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};
const User = require("../models/userModal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const RequestFailed = require('../response/RequestFailedResponse');
const { createUser, findByRole } = require("../helper/userhelper");
const Category = require("../models/categoryModal");
const { category } = require("../models");
const { responseSuccess } = require("../helper/response");


// Create and Save a new User
exports.createCategory = async (req, res) => {
  // await createUser(req, res, "user")
  try {
    const { name } = req.body


    if (!name || !name.trim().length) {
      return RequestFailed(res, 400, "name");
    }
  
    const category = new Category({
      name: name,
    });
  
    // Save User in the database
    await category
      .save()
      .then(data => {
        responseSuccess(res, "category created successfully",data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the category."
        });
      });
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Some error occurred while creating the category."
    });
  }
};

// Retrieve single Users from the database.
exports.findCategoryById = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return RequestFailed(res, 404, "category id not found");
    }
    const category = await Category.findById({ _id: id })
    if (category) {
      console.log(category);
      responseSuccess(res, "category fetch successfully",category)
    }
    else {
      return RequestFailed(res, 404, "category data not found with this id");

    }


  } catch (error) {
    console.log(error);
    return RequestFailed(res, 500, error);

  }


  // await findByRole(req, res, req.params.role)

};

// Find all Category from database
exports.getAllCategory = async (req, res) => {

  try {
    const category = await Category.find()
    if (category) {
      responseSuccess(res, "category list fetch successfully",category)
      // res.status(200).send(category)
    }

  } catch (error) {
    return RequestFailed(res, 500, error);
  }

};
// Update a category by the id in the request
exports.updateCategory = async (req, res) => {

  try {
    const id = req.params.id
    const { name } = req.body
    if (!id) {
      return RequestFailed(res, 404, "category id not found");
    }
    const category = await Category.findById({ _id: id })
    if (category) {

      category.name = name
      await category
        .save()
        .then(data => {
          console.log(data);
          responseSuccess(res, "category update successfully",data)

        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user."
          });
        });

    }
    else {
      return RequestFailed(res, 404, "category data not found with this id");

    }

  } catch (error) {
    return RequestFailed(res, 500, error);

  }



};


// Delete a Category with the specified id in the request
exports.deleteCategory = async(req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return RequestFailed(res, 404, "category id not found");
    }
    const category =  await Category.deleteOne({ _id: id })
    responseSuccess(res, "category delete successfully")


  } catch (error) {
    return RequestFailed(res, 500, error);
  }
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};
const User = require("../models/userModal");
const Patient = require("../models/patientModal");
const RequestFailed = require('../response/RequestFailedResponse');


// Create and Save a new User
exports.createPatient = async (req, res) => {

const { 
  name,
  phonenumber,
  address, 
  location, 
  city,
  state,
  contact_person,
  contact_phone_number,
  patient_type,
  dob,
  age,
  gender,
  marital_status,
  height,
  weigth,
  bmi,
  isActive,
  referal
} = req.body

const patient = new Patient({
  name:name,
  phonenumber: phonenumber, 
  address: address,  
  location: location,  
  city: city, 
  state: state, 
  contact_person: contact_person, 
  contact_phone_number: contact_phone_number, 
  patient_type: patient_type, 
  dob: dob, 
  age: age, 
  gender: gender, 
  marital_status: marital_status, 
  height: height, 
  weigth: weigth, 
  bmi: bmi, 
  referal: referal,
});

await patient.save()
};

// Retrieve all Users from the database.
exports.find = async (req, res) => {
  patient = await User.find({ role: "patient" })
  res.status(200).send(patient)


};

// Find a single User with an id
exports.findOne = async (req, res) => {
const  patient = await User.findOne({ role: "patient" , _id: req.params.id})
  res.status(200).send(patient)
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
const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "patient Must Have a name"]
  },
  mobilenumber: {
    type: Number,
    required: [true, "Please provide phone number"],
    unique: false,
    minlength: 10,
    maxlength: 10
  },
  phonenumber: {
    type: Number,
    required: [true, "Please provide phone number"],
    unique: false,
    minlength: 10,
    maxlength: 10
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email"]
  },
  address1: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  },

  city: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },

  contact_person: {
    type: String,
    default: null
  },

 contactnumber: {
    type: Number,
    required: [true, "Please provide phone number"],
    unique: false,
    minlength: 10,
    maxlength: 10
  },

  patient_type:   {
    type: String,
    enum: ["OP", "visit"],
    default: "visit"
  },

  dob: {
    type: Date
    // default: Date.now()
  },

  age: {
    type: Number,
    
  },

  gender:   {
    type: String,
    enum: ["male", "female"],
  },
});


const patient = mongoose.model("patient", patientSchema);

module.exports = patient;

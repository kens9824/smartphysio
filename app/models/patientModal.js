const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = mongoose.Schema({

  user_id:{
    type: String,

  },
  name: {
    type: String,
    required: [true, "patient Must Have a name"]
  },
  phonenumber: {
    type: Number,
    unique: false,
    minlength: 10,
    maxlength: 10
  },
  address: {
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

  contact_phone_number: {
    type: Number,
    unique: false,
    minlength: 10,
    maxlength: 10
  },

  patient_type: {
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

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },

  marital_status: {
    type: String,
    enum: ["Single", "Married"]
  },
  height: {
    type: String,
  },
  weigth: {
    type: String,
  },
  bmi: {
    type: String,
  },

  referal: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now()
  }

});


const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

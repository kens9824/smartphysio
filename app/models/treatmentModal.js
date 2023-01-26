const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = mongoose.Schema({


  patient_id:{
    type: String,

  },

  isActive:{
    type: Boolean,
    default: false
  },

  created_at: {
    type: Date,
    default: Date.now()
  }

 

});


const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

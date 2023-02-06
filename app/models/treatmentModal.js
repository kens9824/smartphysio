const mongoose = require("mongoose");
const validator = require("validator");

const treatmentSchema = mongoose.Schema({

  patient_id:{
    type: String,
  },

  isActive:{
    type: Boolean,
    default: false
  },

  created_by:{
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now()
  }

 

});


const Treatment = mongoose.model("Treatment", treatmentSchema);

module.exports = Treatment;

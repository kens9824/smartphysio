const mongoose = require("mongoose");
const validator = require("validator");

const plateformSchema = mongoose.Schema({

  name: {
    type: String,
    required: [true, "plateform Must Have a name"]
  },

  created_at: {
    type: Date,
    default: Date.now()
  }

});


const Plateform = mongoose.model("Plateform", plateformSchema);

module.exports = Plateform;

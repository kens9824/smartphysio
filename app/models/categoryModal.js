const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = mongoose.Schema({

  name: {
    type: String,
    required: [true, "category Must Have a name"]
  },

  created_at: {
    type: Date,
    default: Date.now()
  }

});


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

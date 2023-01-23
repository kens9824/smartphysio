const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User Must Have a name"]
  },
  displayName: {
    type: String,
    default: null
  },
  aadhar: {
    type: Number,
    default: null
  },
  pan: {
    type: Number,
    default: null
  },
  gst: {
    type: Number,
    default: null
  },
  company: {
    type: String,
    default: null
  },
  number: {
    type: Number,
    required: [true, "Please provide phone number"],
    unique: true,
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
  address2: {
    type: String,
    default: null
  },
  locality: {
    type: String,
    default: null
  },
  zip: {
    type: Number,
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
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "user"
  },
  profileImage: {
    type: String,
    default: null
  },
  password: {
    required: [true, "Please provide Password"],
    type: String,
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm Password"],
    validate: {
      //works only with save and Create
      validator: function(el) {
        return el === this.password;
      }
    }
  },
  passwordChangedAt: {
    type: Date
    // default: Date.now()
  },
  passwordResetToken: String,
  passwordResetExpires: String
});


const User = mongoose.model("User", userSchema);

module.exports = User;

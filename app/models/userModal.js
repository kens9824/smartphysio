const mongoose = require("mongoose");
const validator = require("validator");
const { roleList } = require("../utilies/enum.js");

const platform = mongoose.Schema({
  name: {
    type: String
  },

  profileUrl: {
    type: String
  },
})

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "User Must Have a First name"]
  },

  lastName: {
    type: String,
    required: [true, "User Must Have a Last name"]
  },

  referral_code: {
    type: String,
    unique: true,
    required: [true, "User Must Have a referral_code"]
  },

  referrer: {
    type: mongoose.Types.ObjectId,
    // required: [true, "User Must Have a Last name"]
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

  country: {
    type: String,
    // required: [true, "Please provide email"],
    // unique: true,
    // lowercase: true,
    // validate: [validator.isEmail, "Please provide valid email"]
  },

  city: {
    type: String,
    // required: [true, "Please provide email"],
    // unique: true,
    // lowercase: true,
    // validate: [validator.isEmail, "Please provide valid email"]
  },

  address: {
    type: String,
    // required: [true, "Please provide email"],
    // unique: true,
    // lowercase: true,
    // validate: [validator.isEmail, "Please provide valid email"]
  },

  zipcode: {
    type: String,
    // required: [true, "Please provide email"],
    // unique: true,
    // lowercase: true,
    // validate: [validator.isEmail, "Please provide valid email"]
  },

  isSMSAlert: {
    type: Boolean,
    required: [true, "Please provide email"],
    default: false
  },

  platform: [platform],

  photos:[String],

  isActive: {
    type: Boolean,
    required: [true, "Please provide email"],
    default: true
  },

  role: {
    type: String,
    required: [true, "Please provide role"],
    enum: [roleList],
  },
  profileImage: {
    type: String,
    default: null
  },
  password: {
    required: [true, "Please provide Password"],
    type: String,
    minlength: 8,
    select: true
  },

  passwordChangedAt: {
    type: Date
    // default: Date.now()
  },
  passwordResetToken: String,
  passwordResetExpires: String,

  created_at: {
    type: Date,
    default: Date.now()
  }

});


const User = mongoose.model("User", userSchema);

module.exports = User;

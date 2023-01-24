const dbConfig = require("../config/db.config.js");


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./userModal");
db.patient = require("./patientModal");


module.exports = db;
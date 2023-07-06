const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser'); 
// const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

const indexRoutes = require("./app/routes/indexRoute");




const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};


app.use(cors());
// app.use(
//   fileUpload()
// );
// app.use(bodyParser);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({urlencoded:true}));

const db = require("./app/models");


// simple route
app.get("/", (req, res) => {
  res.send("Welcome to vidbling Backend.");
});

app.use('/api',indexRoutes)


// app.use('/patient', patientRoutes);



db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
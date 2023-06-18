const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser'); 


const dotenv = require("dotenv");

const userRoutes = require("./app/routes/userRoute");
const categoryRoutes = require("./app/routes/categoryRoute");


dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};


app.use(cors(corsOptions));
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

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);

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

  app.use('/api', userRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
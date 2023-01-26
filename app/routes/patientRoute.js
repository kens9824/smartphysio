const { createAdmin,createDoctor, find,findOne } = require("../controllers/patientController");
const Auth = require("../middleware/Auth.js");

var router = require("express").Router();


// router.post("/admin",Auth, createAdmin);
// router.post("/doctor", createDoctor);
// router.post("/login", login);


router.get("/", find);

router.get("/:id", findOne );


module.exports = router;


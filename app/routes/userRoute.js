const { createAdmin,createDoctor, find,login } = require("../controllers/userController.js");
const Auth = require("../middleware/Auth.js");

var router = require("express").Router();


router.post("/admin",Auth, createAdmin);
router.post("/doctor", createDoctor);
router.post("/login", login);


router.get("/", find);


module.exports = router;


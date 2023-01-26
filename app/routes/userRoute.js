const { createAdmin,createDoctor, find,findOne,login, createPatient } = require("../controllers/userController.js");
const Auth = require("../middleware/Auth.js");
const {IsPatient, IsDoctor} = require("../middleware/RoleAuth.js");

var router = require("express").Router();


router.post("/admin",Auth, createAdmin);
router.post("/doctor", createDoctor);
router.post("/patient", createPatient);

router.post("/login", login);


router.get("/role/:role",Auth,IsPatient, find);
router.get("/:id",Auth,IsDoctor, findOne);



module.exports = router;


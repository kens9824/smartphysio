const { createAdmin, find,findOne,login, signup } = require("../controllers/userController.js");
const { createUser } = require("../helper/userhelper.js");
const Auth = require("../middleware/Auth.js");
const {IsPatient, IsDoctor} = require("../middleware/RoleAuth.js");

var router = require("express").Router();


// router.post("/admin",Auth, function(req, res){createAdmin});
// router.post("/doctor", createDoctor);
// router.post("/patient", createPatient);
router.post("/signup", signup);

router.post("/login", login);


router.get("/role/:role",Auth, find);
router.get("/:id",Auth, findOne);



module.exports = router;


const { createPlateform, findPlateformById, getAllPlateform, updatePlateform, deletePlateform } = require("../controllers/plateformController.js");
const Auth = require("../middleware/Auth.js");
const { IsAdmin} = require("../middleware/RoleAuth.js");

var router = require("express").Router();


router.post("/",Auth,IsAdmin, createPlateform);
router.get("/all",Auth, getAllPlateform);
router.get("/:id",Auth, findPlateformById);
router.put("/:id",Auth,IsAdmin, updatePlateform);
router.delete("/:id",Auth,IsAdmin, deletePlateform);





module.exports = router;


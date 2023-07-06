const { createPlateform, findPlateformById, getAllPlateform, updatePlateform, deletePlateform } = require("../controllers/plateformController.js");
const Auth = require("../middleware/Auth.js");
const { IsAdmin} = require("../middleware/RoleAuth.js");

var router = require("express").Router();


router.post("/",IsAdmin, createPlateform);
router.get("/all",Auth, getAllPlateform);
router.get("/:id",Auth, findPlateformById);
router.put("/:id",IsAdmin, updatePlateform);
router.delete("/:id",IsAdmin, deletePlateform);





module.exports = router;


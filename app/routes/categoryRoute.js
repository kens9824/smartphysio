const { createCategory, findCategoryById, getAllCategory, updateCategory, deleteCategory } = require("../controllers/categoryController.js");
const Auth = require("../middleware/Auth.js");
const { IsAdmin} = require("../middleware/RoleAuth.js");

var router = require("express").Router();


// router.post("/admin",Auth, function(req, res){createAdmin});
// router.post("/doctor", createDoctor);
// router.post("/patient", createPatient);
router.post("/",IsAdmin, createCategory);
router.get("/all",Auth, getAllCategory);
router.get("/:id",Auth, findCategoryById);
router.put("/:id",IsAdmin, updateCategory);
router.delete("/:id",IsAdmin, deleteCategory);


// router.get("/role/:role",Auth, find);



module.exports = router;


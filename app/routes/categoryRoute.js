const { createCategory, findCategoryById, getAllCategory, updateCategory, deleteCategory } = require("../controllers/categoryController.js");
const Auth = require("../middleware/Auth.js");
const { IsAdmin} = require("../middleware/RoleAuth.js");

var router = require("express").Router();


// router.post("/admin",Auth, function(req, res){createAdmin});
// router.post("/doctor", createDoctor);
// router.post("/patient", createPatient);
router.post("/",Auth,IsAdmin, createCategory);
router.get("/all",Auth, getAllCategory);
router.get("/:id",Auth, findCategoryById);
router.put("/:id",Auth,IsAdmin, updateCategory);
router.delete("/:id",Auth,IsAdmin, deleteCategory);


// router.get("/role/:role",Auth, find);



module.exports = router;


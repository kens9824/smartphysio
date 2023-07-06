const {  find,findOne,login, signup,imageUpload } = require("../controllers/influencerController.js");
const Auth = require("../middleware/Auth.js");
const uploader = require('../helper/userhelper.js')

var router = require("express").Router();



// router.post("/admin",Auth, function(req, res){createAdmin});
// router.post("/doctor", createDoctor);
// router.post("/patient", createPatient);
router.post("/signup", signup);
router.post("/login", login);


router.get("/role/:role",Auth, find);







router.post("/image",uploader.uploadImage.single("image"), imageUpload);
// router.get("/image", (req, res) => {

//     res.status(200).json({
//       success: true,
//       code: 200,
//       message: 'message',
//     });
  
//   });


//   router.get("/:id",Auth, findOne);

module.exports = router;


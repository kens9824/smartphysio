const { create, find } = require("../controllers/user.controller.js");

var router = require("express").Router();


router.post("/", create);
router.get("/", find);


module.exports = router;


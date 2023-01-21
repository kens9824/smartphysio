module.exports = app => {
    const {create,findAll} = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  

    // Create a new user
    router.post("/", create());

    
    // Retrieve all User
    router.get("/",findAll());

 
  
   
  
  };


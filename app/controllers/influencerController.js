const User = require("../models/userModal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const RequestFailed = require('../response/RequestFailedResponse');
const { createUser, findByRole } = require("../helper/userhelper");
const { responseSuccess } = require("../helper/response");


const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Create and Save a new User
exports.signup = async (req, res) => {
  // await createUser(req, res, "influencer")

  const { email, password, number, firstName, lastName, country, city, address, zipcode, platform, referrer,photos } = req.body

  if (!email) {
    return RequestFailed(res, 400, "email");
  }
  if (!password) {
    return RequestFailed(res, 400, "password");
  }
  if (!number) {
    return RequestFailed(res, 400, "number");
  }

  if (!firstName || !firstName.trim().length) {
    return RequestFailed(res, 400, "firstName");
  }

  if (!lastName || !lastName.trim().length) {
    return RequestFailed(res, 400, "lastName");
  }

  if (!country || !country.trim().length) {
    return RequestFailed(res, 400, "country");
  }

  if (!city || !city.trim().length) {
    return RequestFailed(res, 400, "city");
  }

  if (!address || !address.trim().length) {
    return RequestFailed(res, 400, "address");
  }

  if (!zipcode || !zipcode.trim().length) {
    return RequestFailed(res, 400, "zipcode");
  }

  if (!platform || !platform.length) {
    return RequestFailed(res, 400, "platform");
  }

  // if (!platform || !platform.trim().length) {
  //   return RequestFailed(res, 400, "platform");
  // }

  const hashPassword = await bcrypt.hash(password, 12)

 

  let userData = {
    email: req.body.email,
    password: hashPassword,
    number: number,
    firstName: firstName,
    lastName: lastName,
    platform: platform,
    zipcode: zipcode,
    address: address,
    city: city,
    country: country,
    role: "influencer",
    photos:photos,
    referral_code: await codeGenerator(),
    
  }

  if (referrer) {
    const referUserData = await User.findOne({ referral_code: referrer })
    if (!referUserData){

      return RequestFailed(res, 404, "referal user");
    }
    else{
      userData['referrer'] = referUserData._id
    }

  }



  const user = new User(userData);
  console.log(user);
  // Save User in the database
  await user
    .save()
    .then(data => {
      console.log(data);
      responseSuccess(res, "influencer created successfully", data)

      // res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

async function codeGenerator() {
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log(result);

  const isExist = await User.findOne({ referral_code: result })
  if (isExist){
    codeGenerator()
    // return RequestFailed(res, 404, "referal user");
  }
  else{
    return result 
  }
}

exports.createUser = async (req, res, role) => {

  const { email, password, number, name } = req.body

  if (!email) {
    return RequestFailed(res, 400, "email");
  }
  if (!password) {
    return RequestFailed(res, 400, "password");
  }
  if (!number) {
    return RequestFailed(res, 400, "number");
  }

  if (!name || !name.trim().length) {
    return RequestFailed(res, 400, "name");
  }


  const hashPassword = await bcrypt.hash(password, 12)

  const user = new User({
    email: req.body.email,
    password: hashPassword,
    number: number,
    name: name,
    role: role

  });
  console.log(user);
  // Save User in the database
  await user
    .save()
    .then(data => {
      console.log(data);

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// exports.createPatient = async (req, res) => {

//   await createUser(req, res, "patient")
//   await createPatient(req, res)

// };

// exports.createDoctor = async (req, res) => {

//   const { email, password, number, name } = req.body

//   if (!email) {
//     return RequestFailed(res, 400, "email");
//   }
//   if (!password) {
//     return RequestFailed(res, 400, "password");
//   }
//   if (!number) {
//     return RequestFailed(res, 400, "number");
//   }

//   if (!name || !name.trim().length) {
//     return RequestFailed(res, 400, "name");
//   }

//   const hashPassword = await bcrypt.hash(password, 12)

//   const user = new User({
//     email: req.body.email,
//     password: hashPassword,
//     number: number,
//     name: name,
//     role: "doctor"

//   });

//   // Save User in the database
//   await user
//     .save()
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the user."
//       });
//     });
// };

// Retrieve all Users from the database.
exports.find = async (req, res) => {
  console.log('----');

  const user = await findByRole(req, res, req.params.role)

  responseSuccess(res, "Influencer fetch successfully", user)

};

// Find a single User with an id
exports.findOne = async (req, res) => {
  if (req.params.id) {
    user = await User.findById({ _id: req.params.id })
    if (user) {
      responseSuccess(res, "Influencer fetch successfully", user)

    }
    else {
      return RequestFailed(res, 404, "record not Found");
    }
  }
  else {
    return RequestFailed(res, 404, "Id not Found");

  }

};

exports.login = async (req, res) => {


  const { email, password } = req.body

  if (!email) {
    return RequestFailed(res, 400, "email");
  }
  if (!password) {
    return RequestFailed(res, 400, "password");
  }

  const user = await User.findOne({ email: email })
  if (!user) {
    return RequestFailed(res, 401, "user not found");

  } else {
    const isValidate = await bcrypt.compare(password, user.password)

    if (!isValidate) {
      return RequestFailed(res, 401, "bad username/password");
    }
    const data = {
      id: user.id,
    };
    const token = await jwt.sign(data, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });
    const refreshToken = await jwt.sign(
      data,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    if (token) {
      res.status(202).send({ token, refreshToken, user });
    }

  }



};

// Update a User by the id in the request
exports.update = (req, res) => {

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};



exports.imageUpload = async (req, res, next) => {
    /* 
       req.file = { 
         fieldname, originalname, 
         mimetype, size, bucket, key, location
       }
    */

    // location key in req.file holds the s3 url for the image
    let data = {}
    if(req.file) {
        data.image = req.file.location

        res.status(201).send({ 'url':data.image })
    }

    // HERE IS YOUR LOGIC TO UPDATE THE DATA IN DATABASE
};


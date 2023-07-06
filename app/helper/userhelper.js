const User = require("../models/userModal");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RequestFailed = require('../response/RequestFailedResponse');
const AWS = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
})



const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: process.env.AWS_S3_BUCKET_NAME, // change it as per your project requirement
  acl: "public-read", // storage access type
  metadata: (req, file, cb) => {
      cb(null, {fieldname: file.fieldname})
  },
  key: (req, file, cb) => {
      const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
      cb(null, fileName);
  }
});


function sanitizeFile(file, cb) {
  // Define the allowed extension
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

  // Check allowed extensions
  // const isAllowedExt = fileExts.includes(
  //     path.extname(file.originalname.toLowerCase())
  // );

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedMimeType) {
      return cb(null, true); // no errors
  } else {
      // pass error msg to callback, which can be displaye in frontend
      cb("Error: File type not allowed!");
  }
}

// our middleware
exports.uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
      sanitizeFile(file, callback)
  },
  limits: {
      fileSize: 1024 * 1024 * 20 // 2mb file size
  }
})


exports.createUser = async (req, res, role) => {

  const { email, password, number, firstName,lastName } = req.body

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


  const hashPassword = await bcrypt.hash(password, 12)

  const user = new User({
    email: req.body.email,
    password: hashPassword,
    number: number,
    firstName: firstName,
    lastName: lastName,
    role: role,
    referral_code : "DYEOAN"
    // referal: referralCodes.generate({
    //   length: 8,
    //   count: 5,
    // })

  });
console.log(user);
  // Save User in the database
  await user
    .save()
    .then(data => {
      // console.log(data);
      responseSuccess(res, "User created successfully",data)

      // res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};


exports.findByRole = async (req, res, role) => {

  if (role && role != "admin") {
    user = await User.find({ role: role })
    res.status(200).send(user)
  }
  else {
    return RequestFailed(res, 409, "You are Not Allowed for this operation");

  }


};



// exports.generateString = async () => {
//   let result = ' ';
//   const charactersLength = characters.length;
//   for ( let i = 0; i < 6; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }
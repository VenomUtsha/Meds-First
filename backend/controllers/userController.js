const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const imageModel = require('../models/imageModel')

const cors = require('cors');
const jwt = require('jsonwebtoken')


const multer = require("multer");
const fs = require("fs");



//Register a user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,phone,bankAccount} = req.body 
    
    const user = await User.create({
        name,email,password,phone,bankAccount,
        avatar:{
            public_id:"This is a sample id",
            url:"This is profile pic url"
        }
    })
    

    sendToken(user,201,res)
})



//image upload of a user

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });


// exports.uploadImage = catchAsyncErrors(upload.single("file"),async(req,res,next)=>{
//   console.log("Upload");
//   const saveImage =  imageModel({
//         userId: "req.user.id",
//         img: {
//           data: fs.readFileSync("uploads/"+req.file.filename),
//           contentType: "image/png",
//         },
    
//       });


//       console.log(saveImage);
//       saveImage
//         .save()
//         .then((res) => {
//           console.log("image is saved");
//         })
//         .catch((err) => {
//           console.log(err, "error has occur");
//         });
//         res.send('image is saved')
// })



// app.post("/upload", upload.single("file"), (req, res) => {
//   const saveImage =  User({
//     name: req.body.name,
//     img: {
//       data: fs.readFileSync("uploads/"+req.file.filename),
//       contentType: "image/png",
//     },

//   });
//   saveImage
//     .save()
//     .then((res) => {
//       console.log("image is saved");
//     })
//     .catch((err) => {
//       console.log(err, "error has occur");
//     });
//     res.send('image is saved')
// });




//Login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body
    
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password to login",400))
    }

    const user = await User.findOne({email:email}).select("+password")
    //console.log("login")
    //console.log(user)
    
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched = await user.ComparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))

    }

    sendToken(user,200,res)
  
})


//Log out User

exports.logOut = catchAsyncErrors(async(req,res,next)=>{

   res.cookie("token",null,{
       expires:new Date(Date.now()),
       httpOnly:true,

   })

   res.status(200).json({
       success:true,
       message:"Logged out successfully",
   })


})





// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log("controller user")
 // const allData = await imageModel.find({userId:'630a8efa0ea95714d750d642'});


  res.status(200).json({
    success: true,
    user,
    //allData
  });
});


// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {


  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.ComparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});
  
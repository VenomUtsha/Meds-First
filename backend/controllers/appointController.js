const Appointment = require("../models/appointmentModel");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { userInfo } = require("os");

exports.createAppointment = async (req, res, next) => {


    const appointment = await Appointment.create(req.body);
    //console.log(req.body);
  
    res.status(200).json({
      success: true,
      appointment,
    }); 
  }; 



exports.appointmentDetails = async (req, res, next) => {
   // const userinfo = "630625fd6bb34ae62662c024";
    console.log("hello111",req.body);
    const userAppointment = await Appointment.find({userId: req.body.userinfo});

    if(!userAppointment)
    {
        return next(new ErrorHandler("No Appointment available",400));
    }

    res.status(200).json({
        success: true,
        userAppointment
    })

};


exports.allAppoint = async (req, res, next) => {
  // const userinfo = "630625fd6bb34ae62662c024";
   //console.log("hello111",req.body);
   const appointment = await Appointment.find();

   if(!appointment)
   {
       return next(new ErrorHandler("No Appointment available",400));
   }

   res.status(200).json({
       success: true,
       appointment
   })

};
   
const express = require("express");

const router = express.Router();

const { createAppointment,appointmentDetails,allAppoint } = require("../controllers/appointController")

router.route("/createappointment").post(createAppointment);
router.route("/appointmentdetails").post(appointmentDetails); 
router.route("/allappointment").get(allAppoint); 



module.exports = router
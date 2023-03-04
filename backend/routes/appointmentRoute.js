const express = require("express");

const router = express.Router();

const { createAppointment,appointmentDetails } = require("../controllers/appointController")

router.route("/createappointment").post(createAppointment);
router.route("/appointmentdetails").post(appointmentDetails); 



module.exports = router
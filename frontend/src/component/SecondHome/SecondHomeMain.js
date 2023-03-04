import React, { Fragment, useEffect } from "react";
import "./SecondHomeMain.css";

import MetaData from "../layout/Metadata";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Navigate, useNavigate } from "react-router-dom";

const SecondHomeMain = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const goto = () => {
    navigate("/appointment");
  };
  const goto1 = () => {
    navigate("/home");
  };
  return (
    <>
      <MetaData title="E-Medical" />
      <div>
        <div className="chair"></div>
        <div className="text_heading">Your New Smile Starts Here</div>
        <div className="text">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div>
          <button className="get_button" onClick={handleOpen}>
            <p>Get Started</p>
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="box_style">
              <h1>Our Services</h1>
              <button className="button_app" onClick={goto}>
                Appointment
              </button>
              <button className="button_ord" onClick={goto1}>
                Order Medicine
              </button>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default SecondHomeMain;

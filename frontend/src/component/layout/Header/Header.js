import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo2.png";



const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link4Padding: "5px",
  link1Family: "Droid Sans",

  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "Profile",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/profile",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",

  profileIconUrl: "/profile",
  profileIconColor: "rgba(35, 35, 23,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
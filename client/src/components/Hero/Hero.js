import React from "react";
import "./Hero.css";
import BackgroundHero from "./banner.png";

const style = {
  backgroundImage: `url(${BackgroundHero})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "250px",
  width: "100%",
  position: "relative",
  marginLeft: "0px",
  marginRight: "100px",
  marginTop: "-10px",
  marginBottom: "50px"
};

//Exporting the component that will be rendered to the page
//Basically a full-page-with banner
const Hero = props => (
  <div className="hero text-center" style={style}>
    {props.children}
  </div>
);

export default Hero;

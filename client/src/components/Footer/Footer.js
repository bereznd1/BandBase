import React from "react";
import "./Footer.css";

const Background = "darkness.png";
const style = {
  backgroundImage: `url(${Background})`
};

const Footer = () => (
  <div className="footer" style={style}>
    <h1 className="text-primary">&copy; BandBase</h1>
  </div>
);

export default Footer;

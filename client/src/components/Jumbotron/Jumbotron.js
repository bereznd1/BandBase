import React from "react";
import "./Jumbotron.css";
const BackgroundJumbotron = 'banner.jpg';

const style = {
  backgroundImage: `url(${BackgroundJumbotron})`,
  backgroundSize: `cover`,
  backgroundPosition: `center`,
  backgroundRepeat: `no-repeat`,
}

const Jumbotron = ({ children }) => (
  <div
    style={style}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;

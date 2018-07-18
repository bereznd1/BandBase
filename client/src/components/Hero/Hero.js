//Imports REACT
import React from "react";

//Imports the CSS file for styling
import "./Hero.css";

import BackgroundHero from './banner3.jpg';

const style = {
  backgroundImage: `url(${BackgroundHero})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat', 
  height: '250px',
  width: '100%',
  position: 'relative',
  marginLeft: '0px',
  marginRight: '100px',
  marginTop: '-10px',
  marginBottom: '50px'
}

//Hero code (basically a picture that spans the width of the whole page, and has text on it)
const Hero = props => (
  <div
    className="hero text-center"
    style={style}
  >
    {props.children}
  </div>
);



//Exports Hero
export default Hero;

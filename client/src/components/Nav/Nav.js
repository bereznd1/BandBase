import React from "react";
import "./Nav.css";
import AboutModal from "../../components/AboutModal";

const Background = 'darkness.png';
const style = {
  backgroundImage: `url(${Background})`
}

const Nav = () => (

<nav style={style} className="navbar">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="/">BandBase</a>
    </div>
    <ul className="nav navbar-nav navbar-right">
    <li><AboutModal/></li>
      <li><a href="#"><span className ="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="#"><span className ="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
</nav>
);


export default Nav;

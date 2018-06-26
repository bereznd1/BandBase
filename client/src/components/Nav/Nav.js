import React from "react";
import "./Nav.css";

const Nav = () => (



<nav className="navbar">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="/">BandBase</a>
    </div>

    <ul className="nav navbar-nav navbar-right">
      <li><a href="#"><span className ="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="#"><span className ="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
</nav>


);

export default Nav;

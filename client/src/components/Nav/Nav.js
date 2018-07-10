import React from "react";
import "./Nav.css";
import AboutModal from "../../components/AboutModal";
import SignInModal from "../../components/SignInModal";
import LogInModal from "../../components/LogInModal";
import LogOutButton from "../../components/LogOutButton";

const Background = "darkness.png";
const style = {
  backgroundImage: `url(${Background})`
};

const Nav = () => (
  <nav style={style} className="navbar">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="/">
          BandBase
        </a>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <AboutModal />
        </li>
        <li>
          <SignInModal />
        </li>
        <li>
          <LogInModal />
        </li>
      </ul>
    </div>
    <ul className="nav navbar-nav navbar-right">
    <li><AboutModal/></li>
      <li><SignInModal/></li>
      <li><LogInModal/></li>
      <li><LogOutButton/></li>
    </ul>
  </div>
</nav>
);

export default Nav;

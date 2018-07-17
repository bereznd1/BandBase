import React from "react";
import "./Nav.css";
import AboutModal from "../../components/AboutModal";
import SignInModal from "../../components/SignInModal";
import UpdateModal from "../../components/UpdateModal";
import LogInModal from "../../components/LogInModal";
import LogOutButton from "../../components/LogOutButton";
import { ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom";


const Nav = props => (
  <nav className="navbar">
    <div className="visible-xs">
      <ButtonToolbar>
        <DropdownButton
          bsStyle="default"
          noCaret
          title=" Menu"
          id="dropdown-no-caret"
          className="glyphicon glyphicon-th-list"
        >
          <MenuItem eventKey="1">
            <AboutModal />
          </MenuItem>

          {!props.loggedIn ? (
            <MenuItem eventKey="2">
              <SignInModal />
            </MenuItem>
          ) : (
            <MenuItem eventKey="2">
              <Link className="user-link" to={"/api/bands/" + props.userID}>
                <span className="glyphicon glyphicon-user" /> Welcome,{" "}
                {props.currentUser}!
              </Link>
              
            </MenuItem>
          )}

          {!props.loggedIn ? (
            <MenuItem eventKey="3">
              <LogInModal _login={props._login} loggedIn={props.loggedIn} />
            </MenuItem>
          ) : (
            <MenuItem eventKey="3">
              <LogOutButton />
            </MenuItem>
          )}
        </DropdownButton>
      </ButtonToolbar>
    </div>

    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand hidden-xs" href="/">
          BandBase
        </a>
      </div>

      <ul className="nav navbar-nav navbar-right hidden-xs">
        <li>
          <AboutModal />
        </li>
        {!props.loggedIn && (
          <li>
            <SignInModal />
          </li>
        )}
        {!props.loggedIn && (
          <li>
            <LogInModal _login={props._login} loggedIn={props.loggedIn} />
          </li>
        )}
        {props.loggedIn && (
          <li className="user-link">
            <Link className="user-link" to={"/api/bands/" + props.userID}>
              <span className="glyphicon glyphicon-user" /> Welcome,{" "}
              {props.currentUser}!
            </Link>
          </li>
        )}
        {props.loggedIn && (
          <li>
            <UpdateModal userID = {props.userID} />
          </li>
        )}
        {props.loggedIn && (
          <li>
            <LogOutButton />
          </li>
        )}
      </ul>
    </div>
  </nav>
);

export default Nav;

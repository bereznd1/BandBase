//=======================================
//This component is basically a link on the navbar that says "Log Out".
//When a user clicks this link, this component sends a request to the API to hit the logout route & then reloads 
//the page to reflect latest changes.
//=======================================

import React from "react";
import API from "../../utils/API";

class LogOutButton extends React.Component {
  handleLogout = event => {
    event.preventDefault();
    API.userLogout()
      .then(res => {
        if (res.status === 200) {
        }
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <a href="#" onClick={this.handleLogout}>
          <span className="glyphicon glyphicon-log-out" /> Logout
        </a>
      </div>
    );
  }
}

export default LogOutButton;

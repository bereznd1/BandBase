//==================================================
// This component handles the Logging-In portion of the app
//==================================================

//Importing necessary components
import React from "react";
import { FormGroup, ControlLabel } from "react-bootstrap";
import { Input, FormBtn } from "../Form";
import API from "../../utils/API";

//Extends the React Component
class LogForm extends React.Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  //When something new is entered into the form, update the state
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //When the form is submitted, if both the username & password are filled in, send an API request to the Log In route
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.userLogin({
        username: this.state.username,
        password: this.state.password
      })

        //If a response is received with no error, then login
        .then(res => {
          if (res.status !== 401) {
            this.props._login();
            window.location.reload();
            if (this.props.onSubmit) {
              this.props.onSubmit();
            }
          }
        })

        //If an error is caught (the username or password didn't log in successfully), save it to the state
        .catch(err => {
          if (err.response.status === 401) {
            this.setState({ error: "Wrong Username or Password!" });
          }
        });
    }
  };

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Username</ControlLabel>
          <Input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Username"
            onChange={this.handleInputChange}
          />

          <ControlLabel>Password</ControlLabel>
          <Input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleInputChange}
          />

          <p style={{ color: "#ff0000", fontWeight: "bold" }}>
            {this.state.error}
          </p>

          <FormBtn
            disabled={!(this.state.username && this.state.password)}
            onClick={this.handleFormSubmit}
          >
            Login
          </FormBtn>
        </FormGroup>
        <br />
        <br />
      </form>
    );
  }
}

export default LogForm;

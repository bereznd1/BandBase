import React from "react";
import "./LogForm.css";
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
  OverlayTrigger
} from "react-bootstrap";
import { Input, TextArea, Select, FormBtn } from "../Form";

import API from "../../utils/API";
class LogForm extends React.Component {
  // constructor(props, context) {
  //   super(props, context);

  //   // this.state = {
  //   //   username: '',
  //   //   password:''
  //   // };
  // }

  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.userLogin({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => {
          console.log(res);
          console.log(
            "hello " + res.data.user.name + ". Thank you for logging in"
          );
          this.props._login();
          window.location.reload();
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.status === 401) {
            console.log("wrong username or password!");
          }
        });
    }

    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          // validationState={this.getValidationState()}
        >
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
          <FormBtn
            disabled={!(this.state.username && this.state.password)}
            onClick={this.handleFormSubmit}
          >
            Login
          </FormBtn>
          {/* <FormControl.Feedback /> */}
          {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
        </FormGroup>
        <br />
        <br />
      </form>
    );
  }
}

export default LogForm;

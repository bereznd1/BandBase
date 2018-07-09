import React from "react";
import "./LogForm.css";
import { FormGroup, FormControl, HelpBlock, ControlLabel, OverlayTrigger} from 'react-bootstrap';
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
    }
    
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      }); 
      console.log(this.state);
    };
  

    handleFormSubmit = event => {
      event.preventDefault();
      if (
        this.state.username &&
        this.state.password
      ) {
        API.userLogin({
          username: this.state.username,
          password: this.state.password
        })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }

      if (this.props.onSubmit)
      {
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
            <ControlLabel>UserName</ControlLabel>
            <Input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Enter text"
              onChange={this.handleInputChange}
            />
            
            <ControlLabel>Password</ControlLabel>
            <Input
              type="text"
              name = "password"
              value={this.state.password}
              placeholder="Enter text"
              onChange={this.handleInputChange}
            />
          <FormBtn
          disabled={
            !(
              this.state.username &&
              this.state.password
            )
          }
          onClick={this.handleFormSubmit}
        >
          Login
        </FormBtn>
            {/* <FormControl.Feedback /> */}
            {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
          </FormGroup>
        </form>
      );
    }
  }
  
export default LogForm; 
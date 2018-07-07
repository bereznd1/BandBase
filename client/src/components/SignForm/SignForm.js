import React from "react";
import "./SignForm.css";
import Form from "../../components/Form";
import { FormGroup, FormControl, HelpBlock, ControlLabel, OverlayTrigger} from 'react-bootstrap';

class SignForm extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      // this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        userName: '',
        password:''
       
      };
    }
  
    render() {
      return (
        <form>
          <FormGroup
            controlId="formBasicText"
            // validationState={this.getValidationState()}
          >
            <ControlLabel>UserName</ControlLabel>
            <FormControl
              type="text"
              userName={this.state.userName}
              placeholder="UserName"
              onChange={this.handleChange}
            />
            
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="text"
              password={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />

             <ControlLabel>Verify Password</ControlLabel>
            <FormControl
              type="text"
              verify={this.state.verify}
              placeholder="Enter text"
              onChange={this.handleChange}
            />

             <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              email={this.state.email}
              placeholder="Enter text"
              onChange={this.handleChange}
            />

            

            <FormControl.Feedback />
            {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
          </FormGroup>
        </form>
      );
    }
  }
  
export default SignForm; 
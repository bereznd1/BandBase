import React from "react";
import "./SignForm.css";
import { FormGroup, FormControl, HelpBlock, ControlLabel, OverlayTrigger} from 'react-bootstrap';

class SignForm extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        value: ''
      };
    }
  
    getValidationState() {
      const length = this.state.value.length;
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
      return null;
    }
  
    handleChange(e) {
      this.setState({ value: e.target.value });
    }
  
    render() {
      return (
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>UserName</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />

             <ControlLabel>Verify Password</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />

             <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
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
import React from "react";
import "./LogForm.css";
import { FormGroup, FormControl, HelpBlock, ControlLabel, OverlayTrigger} from 'react-bootstrap';

class LogForm extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        userName: '',
        pw:''
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
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="text"
              pw={this.state.pw}
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
  
export default LogForm; 
import React from "react";
import "./ThankModal.css";
import { Modal, Button, Popover, Tooltip, OverlayTrigger} from 'react-bootstrap';

const Hand = 'hand.png';

class ThankModal extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {

  
      return (
        <div>

          {/* <Button bsStyle="primary" bsSize="large" style={text} >
            About
          </Button> */}
  
          <Modal show={this.props.show} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
         <h4>Thank you for signing up with BandBase! <span><img src={Hand} width="50" height="50" /></span></h4> 
 
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  

export default ThankModal;
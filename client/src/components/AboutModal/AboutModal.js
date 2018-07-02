import React from "react";
import "./AboutModal.css";
import { Modal, Button, Popover, Tooltip, OverlayTrigger} from 'react-bootstrap';

class AboutModal extends React.Component {
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
      const popover = (
        <Popover id="modal-popover" title="popover">
          very popover. such engagement
        </Popover>
      );
      const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
  
      return (
        <div>

          <a href="#" onClick={this.handleShow}><span className ="glyphicon glyphicon-user"></span>About</a>
          {/* <Button bsStyle="primary" bsSize="large" style={text} >
            About
          </Button> */}
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>BandBase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>The easy ways for Bands to connect!</h4>
              <p>Bandbase is a database of bands around the country. Artists upload information about their band (genre, contact info, location, and gig availability) to BandBase which can then be viewed by other bands and promoters. This app will assist artists who want to go on tour and want to make sure the cities they visit have other bands with which they can play shows. </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  

export default AboutModal;
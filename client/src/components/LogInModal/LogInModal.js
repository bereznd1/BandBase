import React from "react";
import "./LogInModal.css";
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import LogForm from "../../components/LogForm";

class LogInModal extends React.Component {
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

        <a href="#" onClick={this.handleShow}><span className="glyphicon glyphicon-log-in"></span> Log In</a>
        {/* <Button bsStyle="primary" bsSize="large" style={text} >
            About
          </Button> */}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LogForm onSubmit={this.handleClose.bind(this)}/>
          </Modal.Body>
          <Modal.Footer>
 
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default LogInModal;
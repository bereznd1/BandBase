import React from "react";
import "./SignInModal.css";
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import SignForm from "../../components/SignForm";

class SignInModal extends React.Component {
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

        <a href="#" onClick={this.handleShow}><span className="glyphicon glyphicon-user"></span>Sign Up</a>
        {/* <Button bsStyle="primary" bsSize="large" style={text} >
            About
          </Button> */}



        <Modal show={this.state.show} onHide={this.handleClose} className="modal-main">
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignForm onSubmit={this.handleClose.bind(this)} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


export default SignInModal;
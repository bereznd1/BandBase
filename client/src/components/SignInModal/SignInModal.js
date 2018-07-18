//=======================================
//This component is the modal which displays the SIGN UP form.
//=======================================

//Importing necessary components
import React from "react";
import "./SignInModal.css";
import { Modal } from "react-bootstrap";
import SignForm from "../../components/SignForm";
import ThankModal from "../ThankModal";

class SignInModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      showThanks: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  //Handles whether or not a "Thank You For Signing Up" modal will display after submission.
  closeThanks() {
    this.setState({ showThanks: false });
    window.location.reload();
  }

  showThanks() {
    this.handleClose();
    this.setState({ showThanks: true });
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.handleShow}>
          <span className="glyphicon glyphicon-user" /> Sign Up
        </a>

        <ThankModal
          show={this.state.showThanks}
          handleClose={this.closeThanks.bind(this)}
        />

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          className="modal-main"
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignForm onSubmit={this.showThanks.bind(this)} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default SignInModal;

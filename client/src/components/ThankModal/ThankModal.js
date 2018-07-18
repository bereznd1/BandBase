//=======================================
//This component displays a thank you message after a user has signed up.
//=======================================

//importing necessary components
import React from "react";
import { Modal, Button } from "react-bootstrap";
const Hand = "hand.png";

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
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>
              Thank you for signing up with BandBase! You can now Log In with your new account!{" "}
              <span>
                <img src={Hand} alt="waving-hand" width="50" height="50" />
              </span>
            </h4>
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

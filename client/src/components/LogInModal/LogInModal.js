//=======================================
// This component is the modal that contains the actual Log In form inside of it.
//=======================================

//importing necessary components
import React from "react";
import { Modal } from "react-bootstrap";
import LogForm from "../../components/LogForm";

//Handles how the form pops up and closes
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
        <a href="#" onClick={this.handleShow}>
          <span className="glyphicon glyphicon-log-in" /> Log In
        </a>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {/* This displays the actual Log In form component. 
            This component is passed in props so that it is able to handle a log in request to the API & so that it will know to close the modal when a log in is submitted.
            It is then, in turn, passing on these props to another component.*/}

            <LogForm
              _login={this.props._login}
              loggedIn={this.props.loggedIn}
              onSubmit={this.handleClose.bind(this)}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default LogInModal;

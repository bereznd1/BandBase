import React from "react";
import "./SignInModal.css";
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
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

  closeThanks() {
    this.setState({showThanks: false});
  }

  showThanks() {
    //this.handleClose();
    this.setState({showThanks: true});
    this.setState({show:true}); 
  }

  render() {


    return (
      <div>

        <a href="#" onClick={this.handleShow}><span className="glyphicon glyphicon-user"></span> Sign Up</a>
        {/* <Button bsStyle="primary" bsSize="large" style={text} >
            About
          </Button> */}

        <ThankModal 
          show={this.state.showThanks}
          handleClose={this.closeThanks.bind(this)}
        /> 

        <Modal show={this.state.show} onHide={this.handleClose} className="modal-main">
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
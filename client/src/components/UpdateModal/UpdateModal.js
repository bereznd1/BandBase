//=======================================
//This component is a modal that contains the actual Update Profile form inside of it.
//=======================================

//importing necessary components
import React from "react";
import "./UpdateModal.css";
import { Modal } from "react-bootstrap";
import UpdateForm from "../../components/UpdateForm";
import ThankModal from "../ThankModal";
import API from "../../utils/API";

class UpdateModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      band: {},
      show: false,
      showThanks: false
    };
  }

  //When the component mounts, send a request to the API using the userID (passed in as a prop) of the band that is currently logged in.
  //The response back will contain all of that band's profile information & will be saved to the band object in the state.
  componentDidMount = props => {
    API.getBand(this.props.userID)
      .then(res => this.setState({ band: res.data }))
      .catch(err => console.log(err));
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  closeThanks() {
    this.setState({ showThanks: false });
  }

  showThanks() {
    this.handleClose();
    this.setState({ showThanks: true });
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.handleShow}>
          <span className="glyphicon glyphicon-pencil" /> Update/Delete Profile
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
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* This will display the actual Update Form inside of the modal, and will pass in the logged in band's data as a prop to the form. */}
            <UpdateForm
              onSubmit={this.showThanks.bind(this)}
              bandData={this.state.band}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default UpdateModal;

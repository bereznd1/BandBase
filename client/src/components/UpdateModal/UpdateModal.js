import React from "react";
import "./UpdateModal.css";
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import UpdateForm from "../../components/UpdateForm";
import ThankModal from "../ThankModal";
import API from "../../utils/API";
import { Link } from "react-router-dom";



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


  componentDidMount = (props) => {
    
    
    API.getBand(this.props.userID)
      .then(res => this.setState({ band: res.data }))
      .catch(err => console.log(err));

      console.log(this.state.band)
     
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
    this.handleClose();
    this.setState({showThanks: true});
  }

  render() {


    return (
      <div>

        {/* <Link to={"/api/bands/" + props.userID}> */}
<a href="#" onClick={this.handleShow}><span className="glyphicon glyphicon-user"></span> Update</a>

{/* </Link> */}

        {/* <Button bsStyle="primary" bsSize="large" style={text} >
            About
          </Button> */}

        <ThankModal 
          show={this.state.showThanks}
          handleClose={this.closeThanks.bind(this)}
        /> 

        <Modal show={this.state.show} onHide={this.handleClose} className="modal-main">
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UpdateForm onSubmit={this.showThanks.bind(this)} bandData = {this.state.band} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


export default UpdateModal;
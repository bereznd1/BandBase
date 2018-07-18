// ======================================================
//This component displays basic information about the app for anybody that's curious.
// ============================================================

//Importing necessary components
import React from "react";
import "./AboutModal.css";
import { Modal, Button } from "react-bootstrap";

//Extending the React Component class
class AboutModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  //Handles how the modal shows up and closes
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  //The actual modal that is rendered to the page
  render() {
    return (
      <div>
        <a href="#/" onClick={this.handleShow}>
          <span className="glyphicon glyphicon-info-sign" /> About
        </a>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="headline">The Easy Way for Bands to Connect!</h4>
            <p>
              BandBase is a one of a kind app that allows bands/artists from
              around the country to connect with one another in order to book
              shows together if they plan to go on tour in a particular area.
              Promoters can use the database as well to find artists in specific
              locations who play specific genres of music, which will then help
              them get in contact with these artists to book them for gigs.
            </p>

            <p>
              BandBase allows visitors, as well as registered members, to filter
              for a specific artist based on <strong>Artist Name</strong>,{" "}
              <strong>Location</strong>, <strong>Genre</strong>, &{" "}
              <strong>Availability</strong> (which comes in 3 options:{" "}
              <em>On Tour Currently</em>, <em>On Hiatus</em>, &{" "}
              <em>Available for Shows</em>). It is currently the only app that
              allows such an easy method to filter artists from around the
              country with multiple criteria at once.
            </p>

            <p>
              In order to submit your information to the database, click
              <strong> "Sign Up"</strong> to create a new account for your band.
              Once you're registered, you can Log In and update or delete your
              profile.
            </p>

            <p>
              So what are you waiting for? Sign up for an account today and
              start browsing!
            </p>
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

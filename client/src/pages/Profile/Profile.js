//===============================================================
// This component represents the page of the app that displays an individual band's profile
//===============================================================

//importing necessary components
import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import email from "./email-icon.png";
import fb from "./fb-icon.png";
import phone from "./phone-icon.png";
import "./Profile.css";
import Background from "./tri.png";

const style = {
  backgroundImage: `url(${Background})`
};

//The initial state of the component contains an empty "band" object that will later on be filled with the data of the band whose profile it is.
class Profile extends Component {
  state = {
    band: {}
  };

  //When this component mounts, it sends a request to the API to grab the data for the band in question by sending it that band's ID as a parameter.
  //The band's ID is passed in as a prop from a different component.
  //Once the band's data is received, it is saved into this component's state for later use.
  componentDidMount() {
    API.getBand(this.props.bandID)
      .then(res => this.setState({ band: res.data }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps() {
    const url = window.location.pathname;
    const urlArray = url.split("/");
    const parsedID = urlArray.pop();
    API.getBand(parsedID)
      .then(res => this.setState({ band: res.data }))
      .catch(err => console.log(err));
  }

  //A profile template is rendered and filled in with the data of the specific band whose profile it is, by accessing the properties of the "band" object in the state.
  render() {
    return (
      <div>
        <Hero>
          <h1>BandBase</h1>
          <h2>The Ultimate Online Network For Bands & Artists</h2>
        </Hero>
        <Container fluid>
          <center>
            <div style={style} className="profile">
              <Row>
                <Col size="md-12">
                  <center>
                    <div className="profile-title">
                      <h1 className="band-title">
                        <strong>{this.state.band.name}</strong>
                      </h1>
                    </div>
                  </center>

                  <center>
                    <p className="backlink">
                      <Link to="/">← Back to Bands</Link>
                    </p>
                  </center>

                  <br />
                </Col>
              </Row>

              <Row>
                <Col size="md-1" />

                <Col size="md-4">
                  {/*ReactHTMLParser is used to parse any raw HTML code that the user typed into the Sign Up form.*/}
                  <center>
                    <img
                      src={ReactHtmlParser(this.state.band.img)}
                      className="img-thumbnail"
                      alt="profile-picture"
                      style={{ height: "200px" }}
                    />
                  </center>
                  <br />

                  <center>
                    <a href={this.state.band.facebook} target="_blank">
                      <img className="contact-img" src={fb} alt="" />
                    </a>

                    <a href={`mailto:${this.state.band.email}`} target="_blank">
                      <img className="contact-img" src={email} alt="" />
                    </a>

                    <a href={`tel:${this.state.band.phone}`} target="_blank">
                      <img className="contact-img" src={phone} alt="" />
                    </a>
                  </center>

                  <br />

                  <div className="profile-panel">
                    <div className="profile-panel-header">
                      <strong>Basic Info:</strong>
                    </div>

                    <div className="profile-panel-main">
                      <p>
                        <strong>Genre: </strong>
                        {this.state.band.genre}
                      </p>
                      <p>
                        <strong>Location: </strong>
                        {this.state.band.location}
                      </p>
                    </div>
                  </div>
                </Col>

                <Col size="md-6">
                  <div className="profile-panel">
                    <div className="profile-panel-header">
                      <strong>Listen To Our Music!</strong>
                    </div>

                    <div className="profile-panel-main">
                      {this.state.band.musicsample ? (
                        <p>
                          <br />
                          {ReactHtmlParser(this.state.band.musicsample)}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="profile-panel">
                    <div className="profile-panel-header">
                      <strong>Availability:</strong>
                    </div>

                    <div className="profile-panel-main avail">
                      <p>{this.state.band.availability}</p>
                    </div>
                  </div>
                </Col>
                <Col size="md-1" />
              </Row>
            </div>
          </center>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Profile;

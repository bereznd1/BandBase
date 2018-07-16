import React, { Component } from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Panel } from "react-bootstrap";
import Hero from "../../components/Hero/Hero";
import SignInModal from "../../components/SignInModal";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import UpdateModal from "../../components/UpdateModal";
import email from "./email-icon.png";
import fb from "./fb-icon.png";
import phone from "./phone-icon.png";
import "./Profile.css";
import Background from "./tri.png";

const style = {
  backgroundImage: `url(${Background})`
};

class Profile extends Component {
  state = {
    band: {}
  };
  // When this component mounts, grab the band with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBand(this.props.match.params.id)
      .then(res => this.setState({ band: res.data }))
      .catch(err => console.log(err));
  }

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
                    {this.state.band.facebook ? (
                      <a href={this.state.band.facebook} target="_blank">
                        <img className="contact-img" src={fb} alt="" />
                      </a>
                    ) : (
                      ""
                    )}

                    {this.state.band.email ? (
                      <a
                        href={`mailto:${this.state.band.email}`}
                        target="_blank"
                      >
                        <img className="contact-img" src={email} alt="" />
                      </a>
                    ) : (
                      ""
                    )}

                    {this.state.band.phone ? (
                      <a href={`tel:${this.state.band.phone}`} target="_blank">
                        <img className="contact-img" src={phone} alt="" />
                      </a>
                    ) : (
                      ""
                    )}
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
                      <p>
                        {this.state.band.availability}
                      </p>
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

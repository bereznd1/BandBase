import React, { Component } from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Panel } from "react-bootstrap";
// import Jumbotron from "../../components/Jumbotron";
import Hero from "../../components/Hero/Hero";
import SignInModal from "../../components/SignInModal";
import Footer from "../../components/Footer";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import stockprof from "./stockprof.jpg";
import email from "./email-icon.png";
import fb from "./fb-icon.png";
import phone from "./phone-icon.png";
import "./Profile.css";

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
    if (this.state.band.facebook) {
    }

    return (
      <div>
        <Container fluid>

          <Row>
            <Col size="md-12">
              <Hero>
                <h1>BandBase</h1>
                <h2>The Ultimate Online Network For Bands & Artists</h2>
              </Hero>
            </Col>
          </Row>
          <div className="profile">
            <Row>
              <Col size="md-12">
                <center>
                  <h1 className="band-title">
                    <strong>{this.state.band.name}</strong>
                  </h1>
                </center>

                <center>
                  <Link to="/">← Back to Bands</Link>
                </center>

                <br />
              </Col>
            </Row>

            <Row>
              <Col size="md-1" />

<<<<<<< HEAD
              <Col size="md-3">
                <center>
                  <img
                    src={stockprof}
                    className="img-thumbnail"
                    alt="profile-picture"
                  />
                </center>
                <br />

                <center>
                  {this.state.band.facebook ? (
                    <a href={this.state.band.facebook} target="_blank">
                      <img className="contact-img" src={fb} />
                    </a>
                  ) : (
                      ""
                    )}

                  {this.state.band.email ? (
                    <a href={`mailto:${this.state.band.email}`} target="_blank">
                      <img className="contact-img" src={email} />
                    </a>
                  ) : (
                      ""
                    )}

                  {this.state.band.phone ? (
                    <a href={`tel:${this.state.band.phone}`} target="_blank">
                      <img className="contact-img" src={phone} />
                    </a>
                  ) : (
                      ""
                    )}
=======
            <Col size="md-3">
              <center>
                <img
                  src= {ReactHtmlParser(this.state.band.img)}
                  className="img-thumbnail"
                  alt="profile-picture"
                  style={{height: "200px"}}
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
                  <a href={`mailto:${this.state.band.email}`} target="_blank">
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
>>>>>>> f10b486f70ac017b65c090b50e419ddde260069f

                  {/* <a href={`mailto:${this.state.band.email}`} target="_blank">
                  <img className="contact-img" src={email} alt="email" />
                </a>
                <a href={`tel:${this.state.band.phone}`} target="_blank">
                  <img className="contact-img" src={phone} alt="phone" />
                </a> */}
                </center>

                <br />
              </Col>
              <Col size="md-3">

                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h2">
                      <strong>Basic Info:</strong>
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <p>
                      <strong>Genre: </strong>
                      {this.state.band.genre}
                    </p>
                    <p>
                      <strong>Location: </strong>
                      {this.state.band.location}
                    </p>
                    <p>
                      <strong>Availability: </strong>
                      {this.state.band.availability}
                    </p>
                  </Panel.Body>
                </Panel>

              </Col>

              <Col size="md-4">
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h2">
                      <strong>Listen To Our Music!</strong>
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    {this.state.band.bandcamp ? (
                      <p>
                        <strong>Bandcamp: </strong>
                        <br />
                        <br />
                        {ReactHtmlParser(this.state.band.bandcamp)}
                      </p>
                    ) : (
                        ""
                      )}

                    {this.state.band.soundcloud ? (
                      <p>
                        <strong>Soundcloud: </strong>
                        <br />
                        <br />

                        {ReactHtmlParser(this.state.band.soundcloud)}
                      </p>
                    ) : (
                        ""
                      )}

                  </Panel.Body>
                </Panel>
              </Col>
              <Col size="md-1" />
            </Row>
          </div>

          {/* <Row>
      <Col size="md-5  toppad  pull-right col-md-offset-3">
           <A href="edit.html" >Edit Profile</A>

        <A href="edit.html" >Logout</A>
       <br>
<p className=" text-info">May 05,2014,03:00 pm </p>
      </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
   
   
          <div class="panel panel-info">
            <div class="panel-heading">
              <h3 class="panel-title">Sheena Shrestha</h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" class="img-circle img-responsive"> </div>
                
                <!--<div class="col-xs-10 col-sm-10 hidden-md hidden-lg"> <br>
                  <dl>
                    <dt>DEPARTMENT:</dt>
                    <dd>Administrator</dd>
                    <dt>HIRE DATE</dt>
                    <dd>11/12/2013</dd>
                    <dt>DATE OF BIRTH</dt>
                       <dd>11/12/2013</dd>
                    <dt>GENDER</dt>
                    <dd>Male</dd>
                  </dl>
                </div>-->
                <div class=" col-md-9 col-lg-9 "> 
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>Department:</td>
                        <td>Programming</td>
                      </tr>
                      <tr>
                        <td>Hire date:</td>
                        <td>06/23/2013</td>
                      </tr>
                      <tr>
                        <td>Date of Birth</td>
                        <td>01/24/1988</td>
                      </tr>
                   
                         <tr>
                             <tr>
                        <td>Gender</td>
                        <td>Female</td>
                      </tr>
                        <tr>
                        <td>Home Address</td>
                        <td>Kathmandu,Nepal</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td><a href="mailto:info@support.com">info@support.com</a></td>
                      </tr>
                        <td>Phone Number</td>
                        <td>123-4567-890(Landline)<br><br>555-4567-890(Mobile)
                        </td>
                           
                      </tr>
                     
                    </tbody>
                  </table>
                  
                  <a href="#" class="btn btn-primary">My Sales Performance</a>
                  <a href="#" class="btn btn-primary">Team Sales Performance</a>
                </div>
              </div>
            </div>
                 <div class="panel-footer">
                        <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
                        <span class="pull-right">
                            <a href="edit.html" data-original-title="Edit this user" data-toggle="tooltip" type="button" class="btn btn-sm btn-warning"><i class="glyphicon glyphicon-edit"></i></a>
                            <a data-original-title="Remove this user" data-toggle="tooltip" type="button" class="btn btn-sm btn-danger"><i class="glyphicon glyphicon-remove"></i></a>
                        </span>
                    </div>
            
          </div>
        </div>
      </Row> */}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Profile;

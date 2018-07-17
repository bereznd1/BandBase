import React, { Component } from "react";
import Router from "react-router-dom";
import "./UpdateForm.css";
import FormErrors from "../formErrors.js";
import cities from "../../utils/cities.json";
import genres from "../../utils/genres.json";
import ThankModal from "../ThankModal";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
// import SignInModal from "../../components/SignInModal";
import { Input, InputPassword, TextArea, Select, FormBtn } from "../Form";

class UpdateForm extends React.Component {
  // constructor(props, context) {
  //   super(props, context);

  //   // this.handleChange = this.handleChange.bind(this);

  //   this.state = {
  //     userName: '',
  //     password:''

  //   };
  // }

  state = {
    band: {},
    name: "",
    location: "",
    sortedcities: cities.sort(function(a, b) {
      var cityA = a.city.toLowerCase(),
        cityB = b.city.toLowerCase();
      if (cityA < cityB)
        //sort string ascending
        return -1;
      if (cityA > cityB) return 1;
      return 0; //default return value (no sorting)
    }),
    genre: "",
    availability: "",
    facebook: "",
    email: "",
    phone: "",
    musicsample: "",
    img: "",
    dupErrors: {},

    //NAME OF ERROR FROM BACKEND AFTER ATTEMPTED SUBMISSION
    // backendError: ""

    //FRONT END ERRORS

    formErrors: {
      username: "",
      password: "",
      // name: "",
      // location: "",
      // genre: "",
      // availability: "",
      // facebook: "",
      email: "",
      phone: ""
      // bandcamp: "",
      // soundcloud: "",
      // img: ""
    },
    usernameValid: false,
    passwordValid: false,
    // nameValid: false,
    // locationValid: false,
    // genreValid: false,
    // availabilityValid: false,
    // facebookValid: false,
    emailValid: false,
    phoneValid: false,
    // bandcampValid: false,
    // soundcloudValid: false,
    // imgValid: false,
    formValid: false
  };

  componentDidMount() {
    API.getBand(this.props.bandData._id)
      .then(res => this.setState({ band: res.data }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    // let nameValid = this.state.nameValid;
    // let locationValid = this.state.locationValid;
    // let genreValid = this.state.genreValid;
    // let availabilityValid = this.state.availabilityValid;
    // let facebookValid = this.state.facebookValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    // let bandcampValid = this.state.bandcampValid;
    // let soundcloudValid = this.state.soundcloudValid;
    // let imgValid = this.state.imgValid;
    // let formValid = this.state.formValid;

    switch (fieldName) {
      case "username":
        usernameValid = value.length >= 4;
        fieldValidationErrors.username = usernameValid ? "" : " is too short";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;

      case "phone":
        phoneValid = value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/i);
        fieldValidationErrors.phone = phoneValid ? "" : " is invalid";
        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        passwordValid: passwordValid,
        emailValid: emailValid,
        phoneValid: phoneValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.usernameValid && this.state.passwordValid
    });
  }

  // organizeDupErrors = ()  => {

  //   for (let i = 0; i < this.state.dupErrors.length; i++) {

  //         this.state.dupErrors[i]

  //     }

  // }

  // errorClass(error) {
  //   return error.length === 0 ? "" : "has-error";
  // }

  handleFormSubmit = event => {
    event.preventDefault();


  
    

    if (
      this.state.username ||
      this.state.password ||
      this.state.name ||
      this.state.location ||
      this.state.genre ||
      this.state.availability ||
      this.state.facebook ||
      this.state.email ||
      this.state.phone ||
      this.state.musicsample ||
      this.state.img ||
      this.state.formValid
      // this.state.img &&
      // this.state.usernameValid &&
      // this.state.passwordValid &&
      // this.state.emailValid &&
      // this.state.phoneValid
    ) {
      API.updateBand({
        id: this.state.band._id,
        username: this.state.username || this.state.band.username,
        password: this.state.password || this.state.band.password,
        name: this.state.name || this.state.band.name,
        location: this.state.location || this.state.band.location,
        genre: this.state.genre || this.state.band.genre,
        availability: this.state.availability || this.state.band.availability,
        facebook: this.state.facebook || this.state.band.facebook,
        email: this.state.email || this.state.band.email,
        phone: this.state.phone || this.state.band.phone,
        musicsample: this.state.musicsample || this.state.band.musicsample,
        img: this.state.img || this.state.band.img
      })
        .then(res => {
          if (res.data.error) {
            this.setState({ dupErrors: res.data.error });
            // this.state.dupErrors.split(',').join("<br />");

            console.log("FRONT END DUPS" + res.data.error);
          } 
          else {
            window.location.reload();
            if (this.props.onSubmit) {
              this.props.onSubmit();
            }
          }
        })
        //this is the error being sent from "signup.js" by all the individual validation checks
        .catch(err => {
          console.log("Error:");
          console.log(err);
        });
    }
  };

  render() {
    return (
      <form>
        <Row>
          <Col size="md-12">
            <div className="panel panel-default realtimeErrors">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col size="md-6">
            {/* <form> */}
            <p>
              <strong>
                Current User Name:</strong>
                
                 
                {this.state.band.username}
              
            </p>

            <p>
              <strong>
                New User Name:<span className="asterisk">* </span> 
              </strong>
            </p>

            <Input
              value={this.state.username}
              onChange={this.handleInputChange}
              name="username"
              placeholder="New User Name"
            />

            <div className="duplicates">{this.state.dupErrors.username}</div>
            <br />
          </Col>

          <Col size="md-6">
            <p>
              <strong>
               New Password:<span className="asterisk">* </span>
              </strong>
            </p>
            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              type="password"
              placeholder="New Password"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <br/>
            <p>
              <strong>
                Current Band Name:</strong>
                
                
                {this.state.band.name}
              
            </p>

            <p>
              <strong>
                New Band Name:<span className="asterisk">* </span>
              </strong>
            </p>
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="New Band Name"
            />
            <div className="duplicates">{this.state.dupErrors.name}</div>
            <br />
          </Col>
        </Row>

        <Row>
          <Col size="md-6">

            <br/>
            <p>
              <strong>
                Current Genre:</strong>
                
                
                {this.state.band.genre}
              
            </p>

            <p>
              <strong>
                New Genre:<span className="asterisk">* </span>
              </strong>
            </p>

            <Select
              value={this.state.genre}
              onChange={this.handleInputChange}
              name="genre"
            >
              <option value="" hidden>
                Select New Genre
              </option>

              {genres.map(genre => <option key={genre}>{genre}</option>)}
            </Select>
          </Col>

          <Col size="md-6">

            <br/>
            <p>
              <strong>
                Current Location:</strong>
                
                
                {this.state.band.location}
              
            </p>

            <p>
              <strong>
                New Location:<span className="asterisk">* </span>
              </strong>
            </p>


            <Select
              value={this.state.location}
              onChange={this.handleInputChange}
              name="location"
            >
              {/* placeholder="Filter by availability" */}

              <option value="" hidden>
                Select Nearest City
              </option>

              {this.state.sortedcities.map(city => (
                <option key={city.rank}>
                  {city.city}, {city.state}
                </option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row>
          <Col size="md-8">

            <br/>
            <p>
              <strong>
                Current Availability:</strong>
                
                
                {this.state.band.availability}
              
            </p>

            <p>
              <strong>
                New Availability:<span className="asterisk">* </span>
              </strong>
            </p>



            <Select
              value={this.state.availability}
              onChange={this.handleInputChange}
              name="availability"
            >
              <option value="" hidden>
                Select Availability
              </option>
              <option>On Tour Currently</option>
              <option>On Hiatus</option>
              <option>Available for Shows</option>
            </Select>
          </Col>

          <Col size="md-4" />
        </Row>

        <Row>
          <Col size="md-12">
            <br />

            <p>
              <strong>
                <em>Please enter all contact methods:</em>
              </strong>
            </p>

            <br />

            <br/>
            <p>
              <strong>
                Old Facebook URL:</strong>
                
                
                {this.state.band.facebook}
              
            </p>

            <p>
              <strong>
                New Facebook URL:<span className="asterisk">* </span>
              </strong>
            </p>

            <Input
              value={this.state.facebook}
              onChange={this.handleInputChange}
              name="facebook"
              placeholder="New Facebook URL"
            />
            <div className="duplicates">{this.state.dupErrors.facebook}</div>
            <br />
          </Col>
        </Row>

        <Row>
          <Col size="md-6">

            <br/>
            <p>
              <strong>
                Current Email Address:</strong>
                
                
                {this.state.band.email}
              
            </p>

            <p>
              <strong>
                New Email Address:<span className="asterisk">* </span>
              </strong>
            </p>

            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="New Email Address"
            />
            <div className="duplicates">{this.state.dupErrors.email}</div>
            <br />
          </Col>

          <Col size="md-6">

            <br/>
            <p>
              <strong>
                Current Phone Number:</strong>
                
                
                {this.state.band.phone}
              
            </p>

            <p>
              <strong>
                New Phone Number (XXX-XXX-XXXX):<span className="asterisk">* </span> 
              </strong>
            </p>

            <Input
              value={this.state.phone}
              onChange={this.handleInputChange}
              name="phone"
              placeholder="New Phone Number"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <br />

            <p>
              <strong>
                Please enter a <em>NEW</em> embed code from a music sharing site (i.e. Bandcamp
                or Soundcloud) for others to hear your work:<span className="asterisk">* </span>
              </strong>
            </p>


            <Input
              value={this.state.musicsample}
              onChange={this.handleInputChange}
              name="musicsample"
              placeholder="New Music Sharing Embed Code"
            />
            <div className="duplicates">{this.state.dupErrors.musicsample}</div>
            <br />
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <p>
              <strong>
                New Band Img URL:<span className="asterisk">* </span>
              </strong>
            </p>

            <Input
              value={this.state.img}
              onChange={this.handleInputChange}
              name="img"
              placeholder="New Band Img URL"
            />
            <div className="duplicates">{this.state.dupErrors.img}</div>
            <br />

            <div className="panel panel-default realtimeErrors">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
          </Col>

          <br />

          <center>
            <p>
              <span className="asterisk">* </span>
              <strong> = Required Fields</strong>
            </p>
          </center>
        </Row>

        <Row>
          <Col size="md-12">
            <FormBtn
              disabled={
                !(
                  this.state.username ||
                  this.state.password ||
                  this.state.name ||
                  this.state.location ||
                  this.state.genre ||
                  this.state.availability ||
                  this.state.facebook ||
                  this.state.email ||
                  this.state.phone ||
                  this.state.musicsample ||
                  this.state.img ||
                  this.state.formValid
                )

                // this.state.formValid
              }
              onClick={this.handleFormSubmit}
            >
              Update Profile
            </FormBtn>
          </Col>
        </Row>
      </form>
    );
  }
}

export default UpdateForm;

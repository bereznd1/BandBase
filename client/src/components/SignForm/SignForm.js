import React, { Component } from "react";
import Router from "react-router-dom";
import "./SignForm.css";
import FormErrors from "../formErrors.js";
import cities from "../../utils/cities.json";
import genres from "../../utils/genres.json";
import ThankModal from "../ThankModal"; 
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
// import SignInModal from "../../components/SignInModal";
import { Input, InputPassword, TextArea, Select, FormBtn } from "../Form";

class SignForm extends React.Component {
  // constructor(props, context) {
  //   super(props, context);

  //   // this.handleChange = this.handleChange.bind(this);

  //   this.state = {
  //     userName: '',
  //     password:''

  //   };
  // }

  state = {
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
    bandcamp: "",
    soundcloud: "",
    formErrors: {
      username: "",
      password: "",
      name: "",
      location: "",
      genre: "",
      availability: "",
      facebook: "",
      email: "",
      phone: "",
      bandcamp: "",
      soundcloud: ""
    },
    usernameValid: false,
    passwordValid: false,
    nameValid: false,
    locationValid: false,
    genreValid: false,
    availabilityValid: false,
    facebookValid: false,
    emailValid: false,
    phoneValid: false,
    bandcampValid: false,
    soundcloudValid: false,
    formValid: false
    // img: ""
  };

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
    let nameValid = this.state.nameValid;
    let locationValid = this.state.locationValid;
    let genreValid = this.state.genreValid;
    let availabilityValid = this.state.availabilityValid;
    let facebookValid = this.state.facebookValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    let bandcampValid = this.state.bandcampValid;
    let soundcloudValid = this.state.soundcloudValid;
    let formValid = this.state.formValid;

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
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.usernameValid && this.state.passwordValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.username.length &&
      this.state.password &&
      this.state.name &&
      this.state.location &&
      this.state.genre &&
      this.state.availability &&
      (this.state.facebook || this.state.email || this.state.phone) &&
      (this.state.bandcamp || this.state.soundcloud)
      // this.state.img
    ) {
      API.saveBand({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        location: this.state.location,
        genre: this.state.genre,
        availability: this.state.availability,
        facebook: this.state.facebook,
        email: this.state.email,
        phone: this.state.phone,
        bandcamp: this.state.bandcamp,
        soundcloud: this.state.soundcloud
        // img: this.state.img
      })
        .then(res => {
          window.location.reload();
          alert('Thanks for signing up!'); 
          ThankModal.handleShow();
          //ThankModal.setState({show:true}); 
        })
        .catch(err => console.log(err));
    }

    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };

  render() {
    return (
      // <form>
      //   <FormGroup
      //     controlId="formBasicText"
      //     // validationState={this.getValidationState()}
      //   >
      //     <ControlLabel>UserName</ControlLabel>
      //     <FormControl
      //       type="text"
      //       userName={this.state.userName}
      //       placeholder="UserName"
      //       onChange={this.handleChange}
      //     />

      //     <ControlLabel>Password</ControlLabel>
      //     <FormControl
      //       type="text"
      //       password={this.state.password}
      //       placeholder="Password"
      //       onChange={this.handleChange}
      //     />

      //      <ControlLabel>Verify Password</ControlLabel>
      //     <FormControl
      //       type="text"
      //       verify={this.state.verify}
      //       placeholder="Enter text"
      //       onChange={this.handleChange}
      //     />

      //      <ControlLabel>Email</ControlLabel>
      //     <FormControl
      //       type="text"
      //       email={this.state.email}
      //       placeholder="Enter text"
      //       onChange={this.handleChange}
      //     />

      //     <FormControl.Feedback />
      //     {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
      //   </FormGroup>
      // </form>

      <form action="/">
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>

        <Row>
          <Col size="md-6">
            {/* <form> */}
            <Input
              value={this.state.username}
              onChange={this.handleInputChange}
              name="username"
              placeholder="User Name (required - at least 4 characters)"
            />
          </Col>

          <Col size="md-6">
            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              type="password"
              placeholder="Password (required - at least 6 characters)"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="Band Name (required)"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-6">
            <Select
              value={this.state.genre}
              onChange={this.handleInputChange}
              name="genre"
            >
              <option value="" hidden>
                Select Genre (required)
              </option>

              {genres.map(genre => <option key={genre}>{genre}</option>)}
            </Select>
          </Col>

          <Col size="md-6">
            <Select
              value={this.state.location}
              onChange={this.handleInputChange}
              name="location"
            >
              {/* placeholder="Filter by availability" */}

              <option value="" hidden>
                Select Nearest City (required)
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
            <Select
              value={this.state.availability}
              onChange={this.handleInputChange}
              name="availability"
            >
              <option value="" hidden>
                Select Availability (required)
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
            <p>
              <strong>
                Please enter at least <em>1</em> contact method:
              </strong>
            </p>

            <Input
              value={this.state.facebook}
              onChange={this.handleInputChange}
              name="facebook"
              placeholder="Facebook URL"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-6">
            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="Email Address"
            />
          </Col>

          <Col size="md-6">
            <Input
              value={this.state.phone}
              onChange={this.handleInputChange}
              name="phone"
              placeholder="Phone Number"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <p>
              <strong>
                Please enter <em>embed code</em> for at least <em>1</em> music
                sharing site:
              </strong>
            </p>

            <Input
              value={this.state.bandcamp}
              onChange={this.handleInputChange}
              name="bandcamp"
              placeholder="Bandcamp Embed Code"
            />
            {/* <p style="font-size: 10px"><strong><em>Please select either 'Slim' or 'Standard' (No Artwork or Tracklist) option</em></strong></p>

            <br/> */}

            <Input
              value={this.state.soundcloud}
              onChange={this.handleInputChange}
              name="soundcloud"
              placeholder="Soundcloud Embed Code (Please Disable 'Autoplay')"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-6">
            <Input
              value={this.state.img}
              onChange={this.handleInputChange}
              name="pic"
              type="file"
              accept="image/*"
            />
          </Col>

          <Col size="md-6" />
        </Row>

        <Row>
          <Col size="md-12">
            <FormBtn
              disabled={
                !(
                  this.state.username &&
                  this.state.password &&
                  this.state.name &&
                  this.state.location &&
                  this.state.genre &&
                  this.state.availability &&
                  (this.state.facebook ||
                    this.state.email ||
                    this.state.phone) &&
                  (this.state.bandcamp || this.state.soundcloud) &&
                  this.state.formValid
                )
              }
              onClick={this.handleFormSubmit}
            >
              Submit Band
            </FormBtn>
          </Col>
        </Row>
      </form>
    );
  }
}

export default SignForm;

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
      formValid:
        this.state.usernameValid &&
        this.state.passwordValid &&
        this.state.emailValid &&
        this.state.phoneValid
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
      this.state.username &&
      this.state.password &&
      this.state.name &&
      this.state.location &&
      this.state.genre &&
      this.state.availability &&
      this.state.facebook &&
      this.state.email &&
      this.state.phone &&
      this.state.musicsample &&
      this.state.img &&
      this.state.formValid
      // this.state.img &&
      // this.state.usernameValid &&
      // this.state.passwordValid &&
      // this.state.emailValid &&
      // this.state.phoneValid
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
        musicsample: this.state.musicsample,
        img: this.state.img
      })
        .then(res => {
          if (res.data.error) {
            this.setState({ dupErrors: res.data.error });
            // this.state.dupErrors.split(',').join("<br />");

            console.log("FRONT END DUPS" + res.data.error);
          } else {
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
                User Name:<span className="asterisk">*</span>
              </strong>
            </p>
            <Input
              value={this.state.username}
              onChange={this.handleInputChange}
              name="username"
              placeholder="User Name"
            />

            <div className="duplicates">{this.state.dupErrors.username}</div>
            <br />
          </Col>

          <Col size="md-6">
            <p>
              <strong>
                Password:<span className="asterisk">*</span>
              </strong>
            </p>
            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              type="password"
              placeholder="Password"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <p>
              <strong>
                Band Name:<span className="asterisk">*</span>
              </strong>
            </p>
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="Band Name"
            />
            <div className="duplicates">{this.state.dupErrors.name}</div>
            <br />
          </Col>
        </Row>

        <Row>
          <Col size="md-6">
            <p>
              <strong>
                Genre:<span className="asterisk">*</span>
              </strong>
            </p>
            <Select
              value={this.state.genre}
              onChange={this.handleInputChange}
              name="genre"
            >
              <option value="" hidden>
                Select Genre
              </option>

              {genres.map(genre => <option key={genre}>{genre}</option>)}
            </Select>
          </Col>

          <Col size="md-6">
            <p>
              <strong>
                Location:<span className="asterisk">*</span>
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
            <p>
              <strong>
                Availability:<span className="asterisk">*</span>
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

            <p>
              <strong>Facebook URL:</strong>
            </p>

            <Input
              value={this.state.facebook}
              onChange={this.handleInputChange}
              name="facebook"
              placeholder="Facebook URL"
            />
            <div className="duplicates">{this.state.dupErrors.facebook}</div>
            <br />
          </Col>
        </Row>

        <Row>
          <Col size="md-6">
            <p>
              <strong>Email Address:</strong>
            </p>
            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="Email Address"
            />
            <div className="duplicates">{this.state.dupErrors.email}</div>
            <br />
          </Col>

          <Col size="md-6">
            <p>
              <strong>Phone Number (XXX-XXX-XXXX):</strong>
            </p>
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
            <br />

            <p>
              <strong>
                Please enter embed code from a music sharing site (i.e. Bandcamp
                or Soundcloud) for others to hear your work:
              </strong>
            </p>

            <Input
              value={this.state.musicsample}
              onChange={this.handleInputChange}
              name="musicsample"
              placeholder="Music Sharing Embed Code"
            />
            <div className="duplicates">{this.state.dupErrors.musicsample}</div>
            <br />
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <p>
              <strong>
                Band Img URL:<span className="asterisk">*</span>
              </strong>
            </p>

            <Input
              value={this.state.img}
              onChange={this.handleInputChange}
              name="img"
              placeholder="Band Img URL"
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
              <span className="asterisk">*</span>
              <strong> = Required Fields</strong>
            </p>
          </center>
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
                  this.state.facebook &&
                  this.state.email &&
                  this.state.phone &&
                  this.state.musicsample &&
                  this.state.img &&
                  this.state.formValid
                )

                // this.state.formValid
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

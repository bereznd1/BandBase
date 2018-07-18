//=======================================
//This component is the SIGN UP form that a new user will fill out.
//=======================================

//importing necessary components
import React from "react";
import "./SignForm.css";
import FormErrors from "../formErrors.js";
import cities from "../../utils/cities.json";
import genres from "../../utils/genres.json";
import API from "../../utils/API";
import { Col, Row } from "../Grid";
import { Input, Select, FormBtn } from "../Form";

class SignForm extends React.Component {
  //The initial state contains blank values for the various fields that will be filled out.
  state = {
    name: "",
    location: "",
    //This accesses the JSON file of Cities and sorts it in alphabetical order to be later on displayed in a Select field within the form.
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

    //This will hold any errors that are returned by the API, that will indicate if there is already an existing user with the same information. "Duplicate Errors".
    dupErrors: {},

    //This takes care of Front End Error handling that is done by React.
    formErrors: {
      username: "",
      password: "",
      email: "",
      phone: ""
    },
    usernameValid: false,
    passwordValid: false,
    emailValid: false,
    phoneValid: false,
    formValid: false
  };

  //When new information is entered into the form, update the state.
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      //Also, make sure that each new field is validated.
      () => {
        this.validateField(name, value);
      }
    );
  };

  //This runs a "switch statement" on several fields whose format needs to be validated before they can be submitted.
  //The username & password must be a certain length, and the email & phone values need to match a specific rejex pattern.
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
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

  //This sets the state of the form as "valid" IF the validation of several specific fields (which was checked in the above method), was successful.
  validateForm() {
    this.setState({
      formValid:
        this.state.usernameValid &&
        this.state.passwordValid &&
        this.state.emailValid &&
        this.state.phoneValid
    });
  }

  //When the form is submitted, if all the fields have been filled out, send a request to the API which will save the new user in the Database.
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

        //If it turns out that some of the fields (those which must be unique to each individual user) match other values in the database, save those errors to the state. These errors will be displayed on the page.
        .then(res => {
          if (res.data.error) {
            this.setState({ dupErrors: res.data.error });
          } else {
            if (this.props.onSubmit) {
              this.props.onSubmit();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      // This form contains input fields for all the neccessary data. The value of each field is bound to the corresponding item in the state & whenever that field is changed, the state updates accordingly.
      <form>
        <Row>
          <Col size="md-12">
            {/* This displays any ongoing Front End validation errors (those dealing with format & value length) */}
            <div className="panel panel-default realtimeErrors">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col size="md-6">
            <p>
              <strong>
                User Name<em>(at least 4 characters):</em>
                <span className="asterisk">*</span>
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
            <hr />

            <p style={{ fontSize: "20px" }}>
              <strong>
                <em>Please enter all contact methods:</em>
              </strong>
            </p>

            <br />

            <p>
              <strong>
                Facebook URL:<span className="asterisk">*</span>
              </strong>
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
              <strong>
                Email Address:<span className="asterisk">*</span>
              </strong>
            </p>
            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="Email Address"
            />
            <div className="duplicates">{this.state.dupErrors.email}</div>
          </Col>

          <Col size="md-6">
            <p>
              <strong>
                Phone Number (XXX-XXX-XXXX):<span className="asterisk">*</span>
              </strong>
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

            <hr />

            <p>
              <strong>
                Please enter embed code from a music sharing site (i.e. Bandcamp
                or Soundcloud) for others to hear your work:<span className="asterisk">
                  *
                </span>
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
            {/* The button to actually send your band submission will be disabled unless all of the fields have been filled out. */}
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
              }
              onClick={this.handleFormSubmit}
            >
              Sign Up!
            </FormBtn>
          </Col>
        </Row>
      </form>
    );
  }
}

export default SignForm;

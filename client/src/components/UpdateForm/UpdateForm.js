//=======================================
//This component is the UPDATE form that a Logged-In user can use to edit his/her profile info.
//=======================================

//importing necessary components
import React from "react";
import "./UpdateForm.css";
import FormErrors from "../formErrors.js";
import cities from "../../utils/cities.json";
import genres from "../../utils/genres.json";
import API from "../../utils/API";
import { Col, Row } from "../Grid";
import { Input, Select, FormBtn } from "../Form";
import DeleteBtn from "../DeleteBtn";

class UpdateForm extends React.Component {
  //The initial state contains blank values for the various fields that will be filled out.
  //There is also a blank object for "band". This will be populated when the component mounts, with the information from the database that corresponds to the data of the Logged-In user.
  state = {
    band: {},
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

    //This takes care of Front End Error handling that is done by React.
    formErrors: {
      username: "",
      email: "",
      phone: ""
    },
    usernameValid: false,
    emailValid: false,
    phoneValid: false,
    formValid: false
  };

  //When the component mounts, send a request to the API request to get the currently logged-in user's information and save it to the state.
  componentDidMount() {
    API.getBand(this.props.bandData._id)
      .then(res => this.setState({ band: res.data }))
      .catch(err => console.log(err));
  }

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
  //The username must be a certain length, and the email & phone values need to match a specific rejex pattern.
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;

    switch (fieldName) {
      case "username":
        usernameValid = value.length >= 4;
        fieldValidationErrors.username = usernameValid ? "" : " is too short";
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
        this.state.name ||
        this.state.location ||
        this.state.genre ||
        this.state.availability ||
        this.state.facebook ||
        this.state.musicsample ||
        this.state.img ||
        (this.state.username && this.state.usernameValid) ||
        (this.state.email && this.state.emailValid) ||
        (this.state.phone && this.state.phoneValid)
    });
  }

  //When the form is submitted, if any of the fields have been changed (doesn't have to be all, like in the Sign Up form, since a user may only want to update 1 or 2 fields)...
  handleFormSubmit = event => {
    event.preventDefault();

    if (
      this.state.username ||
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
    ) {
      //Send a request to the API that will update the info of the user in the database whose ID matches the ID of the currently logged in user (which is saved in the state within the "band" object)
      API.updateBand({
        id: this.state.band._id,
        username: this.state.username || this.state.band.username,
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
          window.location.reload();
          if (this.props.onSubmit) {
            this.props.onSubmit();
          }
        })

        .catch(err => {
          console.log(err);
        });
    }
  };

  //This method will delete the user from the Database whose ID matches the ID of the currently logged in user
  deleteBand = () => {
    API.deleteBand(this.state.band._id)
      .then(res => {
        window.location.href = "/";
      })

      .catch(err => {
        console.log(err);
      });
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
              <strong>Current User Name: </strong>

              {this.state.band.username}
            </p>

            <p>
              <strong>
                New User Name <em>(at least 4 characters)</em>:
              </strong>
            </p>

            <Input
              value={this.state.username}
              onChange={this.handleInputChange}
              name="username"
              placeholder="New User Name"
            />
          </Col>

          <Col size="md-6">
            <p>
              <strong>Current Band Name: </strong>

              {this.state.band.name}
            </p>

            <p>
              <strong>New Band Name:</strong>
            </p>
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="New Band Name"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-6">
            <br />
            <p>
              <strong>Current Genre: </strong>

              {this.state.band.genre}
            </p>

            <p>
              <strong>New Genre:</strong>
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
            <br />
            <p>
              <strong>Current Location: </strong>

              {this.state.band.location}
            </p>

            <p>
              <strong>New Location:</strong>
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
            <br />
            <p>
              <strong>Current Availability: </strong>

              {this.state.band.availability}
            </p>

            <p>
              <strong>New Availability:</strong>
            </p>

            <Select
              value={this.state.availability}
              onChange={this.handleInputChange}
              name="availability"
            >
              <option value="" hidden>
                Select New Availability
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
            <p>
              <strong>Current Facebook URL: </strong>

              {this.state.band.facebook}
            </p>

            <p>
              <strong>New Facebook URL:</strong>
            </p>

            <Input
              value={this.state.facebook}
              onChange={this.handleInputChange}
              name="facebook"
              placeholder="New Facebook URL"
            />
          </Col>
        </Row>

        <Row>
          <Col size="md-6">
            <br />
            <p>
              <strong>Current Email Address: </strong>

              {this.state.band.email}
            </p>

            <p>
              <strong>New Email Address:</strong>
            </p>

            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="New Email Address"
            />
            <br />
          </Col>

          <Col size="md-6">
            <br />
            <p>
              <strong>Current Phone Number: </strong>

              {this.state.band.phone}
            </p>

            <p>
              <strong>New Phone Number (XXX-XXX-XXXX):</strong>
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
            <hr />

            <p>
              <strong>
                <em>NEW</em> embed code from a music sharing site (i.e. Bandcamp
                or Soundcloud):
              </strong>
            </p>

            <Input
              value={this.state.musicsample}
              onChange={this.handleInputChange}
              name="musicsample"
              placeholder="New Music Sharing Embed Code"
            />
            <br />
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <p>
              <strong>New Band Img URL:</strong>
            </p>

            <Input
              value={this.state.img}
              onChange={this.handleInputChange}
              name="img"
              placeholder="New Band Img URL"
            />
            <br />

            <div className="panel panel-default realtimeErrors">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
          </Col>

          <br />
        </Row>

        <Row>
          <Col size="md-3">
            <DeleteBtn onClick={this.deleteBand}>Delete Profile</DeleteBtn>
          </Col>

          <Col size="md-6" />

          <Col size="md-3">
          {/* The button to actually send your band submission will be disabled unless at least 1 of the fields has been filled out, and the form has been verified as valid on the front end. */}
            <FormBtn
              disabled={
                !(
                  (this.state.username ||
                    this.state.name ||
                    this.state.location ||
                    this.state.genre ||
                    this.state.availability ||
                    this.state.facebook ||
                    this.state.email ||
                    this.state.phone ||
                    this.state.musicsample ||
                    this.state.img) &&
                  this.state.formValid
                )
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

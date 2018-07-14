import React, { Component } from "react";

import cities from "../../utils/cities.json";
import genres from "../../utils/genres.json";

import Profile from "../Profile";

// import Jumbotron from "../../components/Jumbotron";
import Alert from "../../components/Alert/Alert";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer";
import ThankModal from "../../components/ThankModal"; 
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import SignInModal from "../../components/SignInModal";
import { Input, TextArea, Select, FormBtn } from "../../components/Form";
import "./Bands.css";
import bgTexture from "../texture.jpg";

const Background = "tri.png";
const style = {
  backgroundImage: `url(${Background})`
};

class Bands extends Component {
  state = {
    bands: [],
    filteredBands: [],
    name: "",
    location: "",
    sortedcities: cities.sort(function (a, b) {
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
    namesearch: "",
    locationsearch: "",
    genresearch: "",
    availabilitysearch: ""
  };

  componentDidMount() {
    this.loadBands();
  }

  loadBands = () => {
    API.getBands()
      .then(res =>
        this.setState({
          bands: res.data,
          // filteredBands: res.data,
          username: "",
          password: "",
          name: "",
          location: "",
          genre: "",
          availability: ""
        })
      )
      .catch(err => console.log(err));
  };

  // getBand = id => {
  //   API.getBand(id)
  //     .then()
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleChange = (selectedOption) => {
  //   this.setState({ selectedOption });
  //   // selectedOption can be null when the `x` (close) button is clicked
  //   if (selectedOption) {
  //     console.log(`Selected: ${selectedOption.label}`);
  //   }
  // }

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.username &&
      this.state.password &&
      this.state.name &&
      this.state.location &&
      this.state.genre &&
      this.state.availability
    ) {
      API.saveBand({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        location: this.state.location,
        genre: this.state.genre,
        availability: this.state.availability
      })
        .then(res => this.loadBands())
        .catch(err => console.log(err));
    }
  };

  getFilteredBands = () => {
    console.log('location filter', this.state.locationsearch);
    console.log('availability filter', this.state.availabilitysearch);
    console.log('genre search', this.state.genresearch);
    console.log('name search', this.state.namesearch);

    const filteredBands = this.state.bands.filter((band) => {
      return band.name && band.name.toLowerCase().indexOf(this.state.namesearch.toLowerCase()) !== -1;
    }).filter((band) => {
      return band.location && band.location.toLowerCase().indexOf(this.state.locationsearch.toLowerCase()) !== -1;
    }).filter(band => {
      return band.genre && band.genre.toLowerCase().indexOf(this.state.genresearch.toLowerCase()) !== -1;
    }).filter(band => {
      return (
        band.availability && band.availability.toLowerCase().indexOf(this.state.availabilitysearch.toLowerCase()) !== -1
      );
    });

    if (this.state.namesearch || this.state.locationsearch || this.state.genresearch || this.state.availabilitysearch) {
      return filteredBands;
    } else {
      return [];
    }
  }

  handleNameFilterChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      // locationsearch: "",
      // genresearch: "",
      // availabilitysearch: ""
    });

    if (value !== "") {
      const filteredBands = this.state.bands.filter(band => {
        return band.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      this.setState({ filteredBands: filteredBands });
    }

    if (value === "") {
      this.setState({ filteredBands: [] });
    }
  };

  handleLocationFilterChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      // namesearch: "",
      // genresearch: "",
      // availabilitysearch: ""
    });

    if (value !== "") {
      const filteredBands = this.state.bands.filter(band => {
        return band.location.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      this.setState({ filteredBands: filteredBands });
    }

    if (value === "") {
      this.setState({ filteredBands: [] });
    }
  };

  handleGenreFilterChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      // namesearch: "",
      // locationsearch: "",
      // availabilitysearch: ""
    });

    if (value !== "") {
      const filteredBands = this.state.bands.filter(band => {
        return band.genre.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      this.setState({ filteredBands: filteredBands });
    }

    if (value === "") {
      this.setState({ filteredBands: [] });
    }
  };

  handleAvailabilityFilterChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      // namesearch: "",
      // locationsearch: "",
      // genresearch: ""
    });

    if (value !== "") {
      const filteredBands = this.state.bands.filter(band => {
        return (
          band.availability.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
      this.setState({ filteredBands: filteredBands });
    }

    if (value === "") {
      this.setState({ filteredBands: [] });
    }
  };

  // handleFilterSubmit = event => {
  //   event.preventDefault();
  //   if (
  //     this.state.namesearch ||
  //     this.state.locationsearch ||
  //     this.state.genresearch ||
  //     this.state.availabilitysearch
  //   ) {

  //     API.

  //   }

  // };

  render() {
    console.log(this.getFilteredBands());
    return (
      <div className="main-content">
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Hero>
                <h1>BandBase</h1>
                <h2>The Ultimate Online Network For Bands & Artists</h2>
              </Hero>
            </Col>
          </Row>
          <div className="bandtable" style={style}>
            <Row>

              <Col size="md-12">
                <center>
                  <h2>Filter Bands By Keyword...</h2>
                  <h4>Type A Keyword To See Results!</h4>
                </center>
                <br />
                <center>
                  <Link to="/allbands">View All Bands!</Link>
                </center>
                <br /><br />
                <Row>
                  <Col size="md-2" />

                  <Col size="md-2">
                    <Input
                      value={this.state.namesearch}
                      onChange={this.handleNameFilterChange}
                      name="namesearch"
                      placeholder="Name"
                    />
                  </Col>

                  <Col size="md-2">
                    <Input
                      value={this.state.locationsearch}
                      onChange={this.handleLocationFilterChange}
                      name="locationsearch"
                      placeholder="Location"
                    />
                  </Col>

                  <Col size="md-2">
                    <Input
                      value={this.state.genresearch}
                      onChange={this.handleGenreFilterChange}
                      name="genresearch"
                      placeholder="Genre"
                    />
                  </Col>

                  <Col size="md-2">
                    <Input
                      value={this.state.availabilitysearch}
                      onChange={this.handleAvailabilityFilterChange}
                      name="availabilitysearch"
                      placeholder="Availability (Tour, Hiatus, Available)"
                    />
                  </Col>

                  <Col size="md-2" />
                </Row>
              </Col>
            </Row>

            <Row>
              <Col size="md-2" />

              <Col size="md-8">
                <br />

                {this.getFilteredBands().length ? (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.getFilteredBands().map(band => (
                        <tr key={band._id}>
                          <td className="name">
                            <Link to={"/api/bands/" + band._id}>
                              <strong>{band.name}</strong>
                            </Link>
                          </td>
                          <td>{band.location}</td>
                          <td>{band.genre}</td>
                          <td>{band.availability}</td>


                          {/* <td>{band.datePosted.toDateString()}</td> */}

                          {/* </Link> */}
                          {/* <DeleteBtn onClick={() => this.deleteBand(band._id)} /> */}
                          {/* </ListItem> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                ) : (
                    ""
                  )}


                <br />
                <br />
                <br />
              </Col>

              <Col size="md-2" />
            </Row>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Bands;

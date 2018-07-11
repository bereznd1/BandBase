import React, { Component } from "react";

import cities from "../../utils/cities.json";
import genres from "../../utils/genres.json";

import Profile from "../Profile";

import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import SignInModal from "../../components/SignInModal";
import { Input, TextArea, Select, FormBtn } from "../../components/Form";
import "./Bands.css";

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

  // //Trying to make it work with multiple filters
  //   handleFilterChange = event => {
  //     const { name, value } = event.target;

  //     const searchedName = [name];

  //     this.setState({
  //       [name]: value,
  //     });

  //     if (value !== "") {
  //       const filteredBands = this.state.bands.filter(band => {
  //         return band.searchedName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  //       });
  //       this.setState({ filteredBands: filteredBands });
  //     }

  //     if (value === "") {
  //       this.setState({ filteredBands: [] });
  //     }
  //   };

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
    return (
    
    <div>
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
            <h1>BandBase</h1>
              <h2>Description text</h2>
              </Jumbotron>
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <center>
              <h2>Filter Bands By Keyword...</h2>
            </center>
            <br />
            <center>
              <Link to="/allbands">View All Bands!</Link>
            </center>
            <br />
            <Row>
              <Col size="md-3">
                <Input
                  value={this.state.namesearch}
                  onChange={this.handleNameFilterChange}
                  name="namesearch"
                  placeholder="Filter by name"
                />
              </Col>

              <Col size="md-3">
                <Input
                  value={this.state.locationsearch}
                  onChange={this.handleLocationFilterChange}
                  name="locationsearch"
                  placeholder="Filter by location"
                />
              </Col>

              <Col size="md-3">
                <Input
                  value={this.state.genresearch}
                  onChange={this.handleGenreFilterChange}
                  name="genresearch"
                  placeholder="Filter by genre"
                />
              </Col>

              <Col size="md-3">
                <Input
                  value={this.state.availabilitysearch}
                  onChange={this.handleAvailabilityFilterChange}
                  name="availabilitysearch"
                  placeholder="Filter by availability"
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col size="md-2" />

          <Col size="md-8">
            {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
            {this.state.filteredBands.length ? (
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.filteredBands.map(band => (
                    <tr key={band._id}>

                    {/* <td><a onClick={() => this.getBand(band._id)}>{band.name}</a></td> */}

                      <td><Link to={"/api/bands/" + band._id}>{band.name}</Link></td>
                      <td>{band.location}</td>
                      <td>{band.genre}</td>
                      <td>{band.availability}</td>


                      {/* </Link> */}
                      {/* <DeleteBtn onClick={() => this.deleteBand(band._id)} /> */}
                      {/* </ListItem> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
                <center>
                  <br />
                  <h5>Type A Keyword To See Results!</h5>
                </center>
              )}
            <br />
            <br />
            <br />
          </Col>

          <Col size="md-2" />
        </Row>


      
      </Container>
              <Footer/>
      </div>
    );
  }
}


export default Bands;

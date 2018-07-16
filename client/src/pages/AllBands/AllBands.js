import React, { Component } from "react";
import Profile from "../Profile";

import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./AllBands.css";

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
          filteredBands: res.data,
          name: "",
          location: "",
          genre: "",
          availability: ""
        })
      )
      .catch(err => console.log(err));
  };

  // deleteBand = id => {
  //   API.deleteBand(id)
  //     .then(res => this.loadBands())
  //     .catch(err => console.log(err));
  // };

  //   handleInputChange = event => {
  //     const { name, value } = event.target;
  //     this.setState({
  //       [name]: value
  //     });
  //   };

  //   handleFormSubmit = event => {
  //     event.preventDefault();
  //     if (
  //       this.state.name &&
  //       this.state.location &&
  //       this.state.genre &&
  //       this.state.availability
  //     ) {
  //       API.saveBand({
  //         name: this.state.name,
  //         location: this.state.location,
  //         genre: this.state.genre,
  //         availability: this.state.availability
  //       })
  //         .then(res => this.loadBands())
  //         .catch(err => console.log(err));
  //     }
  //   };

  handleNameFilterChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
      // locationsearch: "",
      // genresearch: "",
      // availabilitysearch: ""
    });

    if (value !== "") {
      const filteredBands = this.state.filteredBands.filter(band => {
        return band.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      this.setState({ filteredBands: filteredBands });
    }

    if (value === "") {
      this.setState({ filteredBands: this.state.bands });
    }
  };

  handleLocationFilterChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
      // namesearch: "",
      // genresearch: "",
      // availabilitysearch: ""
    });

    if (value !== "") {
      const filteredBands = this.state.filteredBands.filter(band => {
        return band.location.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      this.setState({ filteredBands: filteredBands });
    }

    if (value === "") {
      this.setState({ filteredBands: this.state.bands });
    }
  };

  handleGenreFilterChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
      // namesearch: "",
      // locationsearch: "",
      // availabilitysearch: ""
    });

    if (value !== "") {
      const filteredBands = this.state.filteredBands.filter(band => {
        return band.genre.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      this.setState({ filteredBands: filteredBands });
    }

    if (value === "") {
      this.setState({ filteredBands: this.state.bands });
    }
  };

  handleAvailabilityFilterChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
      // namesearch: "",
      // locationsearch: "",
      // genresearch: ""
    });

    if (value !== "") {
      const filteredBands = this.state.filteredBands.filter(band => {
        return (
          band.availability.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
      this.setState({ filteredBands: filteredBands });
    }

    if (value === "") {
      this.setState({ filteredBands: this.state.bands });
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
      <div className="main-content">
        
          <Hero>
            <h1>BandBase</h1>
            <h2 className="lead">>The Ultimate Online Network For Bands & Artists</h2>
          </Hero>
          <Container fluid>
            <div className="bandtable" style={style}>
              <Row>
                <Col size="md-12">
                  <center>
                    <h2>List of All Bands...</h2>
                  </center>
                  <br />
                  <center>
                    <p className="backlink"><Link to="/">← Go Back!</Link></p>
                  </center>
                  <br />
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

                  {this.state.bands.length ? (
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
                        {this.state.filteredBands.map(band => (
                          <tr key={band._id}>
                            <td className="name">
                              <Link to={"/api/bands/" + band._id}>
                                <strong>{band.name}</strong>
                              </Link>
                            </td>
                            <td>{band.location}</td>
                            <td>{band.genre}</td>
                            <td>{band.availability}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <center>
                      <h3>No Results to Display</h3>
                    </center>
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

import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./Bands.css";

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
          //filteredBands: res.data,
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.name &&
      this.state.location &&
      this.state.genre &&
      this.state.availability
    ) {
      API.saveBand({
        name: this.state.name,
        location: this.state.location,
        genre: this.state.genre,
        availability: this.state.availability
      })
        .then(res => this.loadBands())
        .catch(err => console.log(err));
    }
  };

  handleNameFilterChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value, locationsearch: "", genresearch: "", availabilitysearch: "" });

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

    this.setState({ [name]: value, namesearch: "", genresearch: "", availabilitysearch: "" });

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

    this.setState({ [name]: value, namesearch: "", locationsearch: "", availabilitysearch: "" });

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

    this.setState({ [name]: value, namesearch: "", locationsearch: "", genresearch: "" });

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
              <a href="/allbands">View All Bands!</a>
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
                      {/* <Link to={"/band/" + band._id}> */}

                      <td>{band.name}</td>
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
        </Row>

        <Row>
          <Col size="md-12">
            {/* Input new band form */}

              <center>
              <div className="submit-form">
                <center>
                  <h2>Submit A New Band!</h2>
                </center>
                <br />
                <form>
                  <Input
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                    placeholder="Band Name (required)"
                  />
                  <Input
                    value={this.state.location}
                    onChange={this.handleInputChange}
                    name="location"
                    placeholder="Location (required)"
                  />
                  <Input
                    value={this.state.genre}
                    onChange={this.handleInputChange}
                    name="genre"
                    placeholder="Genre (required)"
                  />
                  <Input
                    value={this.state.availability}
                    onChange={this.handleInputChange}
                    name="availability"
                    placeholder="Availability (required)"
                  />
                  {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
                  <FormBtn
                    disabled={
                      !(
                        this.state.name &&
                        this.state.location &&
                        this.state.genre &&
                        this.state.availability
                      )
                    }
                    onClick={this.handleFormSubmit}
                  >
                    Submit Band
                  </FormBtn>
                </form>
              </div>
            </center>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bands;

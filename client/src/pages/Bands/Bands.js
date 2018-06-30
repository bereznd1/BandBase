import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import AboutModal from "../../components/AboutModal";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Bands extends Component {
  state = {
    bands: [],
    filteredBands: [],
    name: "",
    location: "",
    genre: "",
    availibility: "",
    namesearch: "",
    locationsearch: "",
    genresearch: "",
    availibilitysearch: ""
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
          availibility: ""
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
      this.state.availibility
    ) {
      API.saveBand({
        name: this.state.name,
        location: this.state.location,
        genre: this.state.genre,
        availibility: this.state.availibility
      })
        .then(res => this.loadBands())
        .catch(err => console.log(err));
    }
  };

  handleNameFilterChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const filteredBands = this.state.bands.filter(band => {
      return band.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.setState({ filteredBands: filteredBands })
  }

  handleLocationFilterChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const filteredBands = this.state.bands.filter(band => {
      return band.location.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.setState({ filteredBands: filteredBands })
  }

  handleGenreFilterChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const filteredBands = this.state.bands.filter(band => {
      return band.genre.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.setState({ filteredBands: filteredBands })
  }

  handleAvailibilityFilterChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const filteredBands = this.state.bands.filter(band => {
      return band.availibility.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.setState({ filteredBands: filteredBands })
  }



  // handleFilterSubmit = event => {
  //   event.preventDefault();
  //   if (
  //     this.state.namesearch ||
  //     this.state.locationsearch ||
  //     this.state.genresearch ||
  //     this.state.availibilitysearch
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
            <AboutModal />
            </Jumbotron>
            {/* Input new band form */}
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
                value={this.state.availibility}
                onChange={this.handleInputChange}
                name="availibility"
                placeholder="Availibility (required)"
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
                    this.state.availibility
                  )
                }
                onClick={this.handleFormSubmit}
              >
                Submit Band
              </FormBtn>
            </form>
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <center>
              <h2>Find Bands...</h2>
            </center>
            <br />
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
                  value={this.state.availibilitysearch}
                  onChange={this.handleAvailibilityFilterChange}
                  name="availibilitysearch"
                  placeholder="Filter by availibility"
                />
              </Col>

            </Row>
            {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
            {this.state.bands.length ? (
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Availibility</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.filteredBands.map(band => (
                    <tr key={band._id}>
                      {/* <Link to={"/band/" + band._id}> */}

                      <td>{band.name}</td>
                      <td>{band.location}</td>
                      <td>{band.genre}</td>
                      <td>{band.availibility}</td>

                      {/* </Link> */}
                      {/* <DeleteBtn onClick={() => this.deleteBand(band._id)} /> */}
                      {/* </ListItem> */}
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
        </Row>
      </Container>
    );
  }
}

export default Bands;

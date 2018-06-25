import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Bands extends Component {
  state = {
    bands: [],
    name: "",
    location: "",
    genre: "",
    availibility: ""
  };

  componentDidMount() {
    this.loadBands();
  }

  loadBands = () => {
    API.getBands()
      .then(res =>
        this.setState({
          bands: res.data,
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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>BandBase</h1>
              <h2>Description text</h2>
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
            {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
            {this.state.bands.length ? (
              <table class="table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Availibility</th>
                  </tr>
                </thead>
                <tbody>
         
                  {this.state.bands.map(band => (
        
                    <tr>
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

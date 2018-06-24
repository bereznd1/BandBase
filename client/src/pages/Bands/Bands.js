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
    if (this.state.name && this.state.location && this.state.genre && this.state.availibility) {
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
          <Col size="md-6">
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
                disabled={!(this.state.name && this.state.location && this.state.genre && this.state.availibility)}
                onClick={this.handleFormSubmit}
              >
                Submit Band
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6 sm-12">
            {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
            {this.state.bands.length ? (
              <List>
                {this.state.bands.map(band => (
                  <ListItem key={band._id}>
                    {/* <Link to={"/band/" + band._id}> */}
                      <strong>
                        {band.name} || {band.location} || {band.genre} || {band.availibility}
                      </strong>
                    {/* </Link> */}
                    {/* <DeleteBtn onClick={() => this.deleteBand(band._id)} /> */}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bands;

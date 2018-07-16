import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import Hero from "../../components/Hero/Hero";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {

  }

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
      this.state.username &&
      this.state.password
    ) {
      API.userLogin({
        username: this.state.username,
        password: this.state.password
      })
        .then(res =>{
          console.log("logging in sir")
          console.log(res.data);
          window.location.href = "/login";
        })
        .catch(err => console.log(err));
    }
  };

  handleNameFilterChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
    const filteredBands = this.state.bands.filter(band => {
      return band.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.setState({filteredBands: filteredBands})
  }

  handleLocationFilterChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
    const filteredBands = this.state.bands.filter(band => {
      return band.location.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.setState({filteredBands: filteredBands})
  }

  handleGenreFilterChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
    const filteredBands = this.state.bands.filter(band => {
      return band.genre.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.setState({filteredBands: filteredBands})
  }

  handleAvailibilityFilterChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
    const filteredBands = this.state.bands.filter(band => {
      return band.availibility.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.setState({filteredBands: filteredBands})
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
            <Hero>
              <h1>BandBase</h1>
              <h2>Description text</h2>
            </Hero>

            {/* Input new band form */}
            <form>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="Username"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="password"
              />
              {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
              <FormBtn
                // disabled={
                //   !(
                //     this.state.username &&
                //     this.state.password
                //   )
                // }
                onClick={this.handleFormSubmit}
              >
                Login
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
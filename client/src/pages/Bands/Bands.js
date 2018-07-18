// ======================================================================
// This component represents the page of the App that displays, within a table, only the filtered bands.
// When the page is first loaded, no bands are shown. After the user types in a filter, the relavant bands pop up within a table.
// ======================================================================

//importing necessary components
import React, { Component } from "react";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input } from "../../components/Form";
import "./Bands.css";

const Background = "tri.png";
const style = {
  backgroundImage: `url(${Background})`
};

//The intial state contains blank values for the various filters that will be applied to the table of bands.
//It also contains an empty "bands" array & an empty "filteredBands" array that will be populated once the API loads all of the bands from the DB.
class Bands extends Component {
  state = {
    bands: [],
    filteredBands: [],
    namesearch: "",
    locationsearch: "",
    genresearch: "",
    availabilitysearch: ""
  };

  //When the component mounts, call the loadBands method, which will access the API to load all the bands in the DB and populate the bands arrays in the state with the results.
  componentDidMount() {
    this.loadBands();
  }

  loadBands = () => {
    API.getBands()
      .then(res =>
        this.setState({
          bands: res.data
        })
      )
      .catch(err => console.log(err));
  };

  //When the value of field on the page is changed, update the state accordingly.
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //This allows the app to filter the table and only display bands that match the search terms that the user typed in.
  //This code takes all of the bands that were loaded up into the component's state, and uses the "filter" method to return only those bands which contain the user's search terms in their corresponding fields.
  getFilteredBands = () => {
    const filteredBands = this.state.bands
      .filter(band => {
        return (
          band.name &&
          band.name
            .toLowerCase()
            .indexOf(this.state.namesearch.toLowerCase()) !== -1
        );
      })
      .filter(band => {
        return (
          band.location &&
          band.location
            .toLowerCase()
            .indexOf(this.state.locationsearch.toLowerCase()) !== -1
        );
      })
      .filter(band => {
        return (
          band.genre &&
          band.genre
            .toLowerCase()
            .indexOf(this.state.genresearch.toLowerCase()) !== -1
        );
      })
      .filter(band => {
        return (
          band.availability &&
          band.availability
            .toLowerCase()
            .indexOf(this.state.availabilitysearch.toLowerCase()) !== -1
        );
      });

    if (
      this.state.namesearch ||
      this.state.locationsearch ||
      this.state.genresearch ||
      this.state.availabilitysearch
    ) {
      return filteredBands;
    } else {
      return [];
    }
  };

  //This code handles what happens to each specific filter that the user may type in & how that affects the component's state.
  handleNameFilterChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
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
      [name]: value
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
      [name]: value
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
      [name]: value
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

  render() {
    return (
      <div className="main-content">
        <Hero>
          <h1>BandBase</h1>
          <h2>The Ultimate Online Network For Bands & Artists</h2>
        </Hero>
        <Container fluid>
          <div className="bandtable" style={style}>
            <Row>
              <Col size="md-12">
                <center>
                  <h2>Filter Bands By Keyword...</h2>
                  <h4>Type A Keyword To See Results!</h4>
                </center>
                <br />
                <center>
                  <p className="backlink">
                    <Link to="/allbands">View All Bands!</Link>
                  </p>
                </center>
                <br />
                <br />
                <Row>
                  <Col size="md-2" />

                  {/*The input fields below allow users to type in different search terms that will filter the database. 
                  The value of each field is bound to the corresponding field in the state, and when that value is changed, the corresponding filter change method is activated.*/}

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

                {/*This code checks whether there are currently any filtered bands in the state, and if there are, it displays a table that contains a row for each band, with each cell in that row corresponding to a particular field, such as location or genre.*/}

                {this.getFilteredBands().length ? (
                  <div className="table-responsive">
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
                              {/*This creates a link to each band's profile by hitting the URL defined in the routes that will query the database for all information on the specific band whose ID is sent in as a parameter.*/}
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
                  </div>
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

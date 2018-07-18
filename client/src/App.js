//=========================================================
//This is the overall highest level component of the app.
//It handles the HTML routing of the app by defining which smaller component to load up based on what URL is being targeted by the browser.
//It also passes down props to the Navbar that will tell it whether or not a user is logged in, as well as a logged-in user's name & id. //Depending on the loggedin state, the navbar will show different options.
//==========================================================

//importing necessary components
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bands from "./pages/Bands";
import AllBands from "./pages/AllBands/AllBands";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import API from "./utils/API";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null,
      userID: null
    };
    this._logout = this._logout.bind(this);
    this._login = this._login.bind(this);
  }

  componentDidMount() {
    axios.get("/auth/authtest/user").then(response => {
      if (!!response.data.user) {
        API.getBand(response.data.user._id).then(res => {
          this.setState({
            loggedIn: true,
            user: res.data.username,
            userID: res.data._id
          });
        });
      } else {
        this.setState({
          loggedIn: false,
          user: null,
          userID: null
        });
      }
    });
  }

  //Methods that are passed down to the navbar to allow logging in & logging out.
  _logout() {
    this.setState({
      loggedIn: false,
      user: null,
      userID: null
    });
  }

  _login() {
    this.setState({
      loggedIn: true
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav
            _logout={this._logout}
            _login={this._login}
            currentUser={this.state.user}
            userID={this.state.userID}
            loggedIn={this.state.loggedIn}
          />
          <Switch>
            <Route exact path="/" component={Bands} />
            <Route exact path="/bands" component={Bands} />
            <Route exact path="/allbands" component={AllBands} />
            <Route
              exact
              path="/api/bands/:id"
              render={props => (
                <Profile bandID={props.match.params.id} {...props} />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

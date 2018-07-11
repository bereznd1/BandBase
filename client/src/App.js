import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bands from "./pages/Bands";
// import Login from "./pages/Login";
import AllBands from "./pages/AllBands/AllBands";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
    this._login = this._login.bind(this)
  }

  _logout() {
    // event.preventDefault();
    this.setState({
      loggedIn:false,
      user:null
    })
		console.log('logging out')
	}

	_login(username) {
    this.setState({
      loggedIn:true,
      user:username
    })
    console.log("the current user that is logged in  is:" + this.state.user);
	};
  
  render() {
		return (
      <Router>
        <div>
          <Nav _logout={this._logout} _login={this._login} loggedIn={this.state.loggedIn} />
          <Switch>
            <Route exact path="/" component={Bands} />
            {/* <Route exact path="/login" component={Login} /> */}
            <Route exact path="/bands" component={Bands} />
            <Route exact path="/allbands" component={AllBands} />
            <Route exact path="/api/bands/:id" component={Profile} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
      );
    }
}

export default App;
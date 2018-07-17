import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bands from "./pages/Bands";
// import Login from "./pages/Login";
import AllBands from "./pages/AllBands/AllBands";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

import API from "./utils/API"

import axios from 'axios'
class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
      user: null,
      userID:null,
		}
		this._logout = this._logout.bind(this)
    this._login = this._login.bind(this)
  }

  componentDidMount(){
    axios.get('/auth/authtest/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
        console.log('THERE IS A USER')
        console.log(response.data.user._id);
        API.getBand(response.data.user._id)
          .then( res => {
            this.setState({
              loggedIn: true,
              user: res.data.username,
              userID: res.data._id
            })
          });
        // console.log(currentUser);

			} else {
				this.setState({
					loggedIn: false,
          user: null,
          userID: null
				})
			}
		})
  }

  _logout() {
    // event.preventDefault();
    this.setState({
      loggedIn:false,
      user:null,
      userID:null
    })
		console.log('logging out')
	}

	_login() {
    this.setState({
      loggedIn:true,
    })
    console.log("the current user that is logged in  is: " + this.state.user);
	};
  
  render() {
		return (
      <Router>
        <div>
          <Nav _logout={this._logout} 
               _login={this._login} 
               currentUser = {this.state.user} 
               userID = {this.state.userID} 
               loggedIn={this.state.loggedIn} 
          />
          <Switch>
            <Route exact path="/" component={Bands} />
            <Route exact path="/bands" component={Bands} />
            <Route exact path="/allbands" component={AllBands} />
            <Route exact path="/api/bands/:id" render={props => <Profile bandID={props.match.params.id} {...props} />} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
      );
    }
}

export default App;
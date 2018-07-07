import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bands from "./pages/Bands";
import Login from "./pages/Login";
import AllBands from "./pages/AllBands/AllBands";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Bands} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/bands" component={Bands} />
        <Route exact path="/allbands" component={AllBands} />
        <Route exact path="/bands/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
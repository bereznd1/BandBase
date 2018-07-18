//==================================
// This component is rendered if the URL in the browser doesn't match any of the website routes that were defined in the App.js file.
//==================================

import React from "react";
import Hero from "../../components/Hero/Hero";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const NoMatch = () => (
  <div>
    <Hero>
      <h1>404 Page Not Found</h1>
      <h1>
        <span role="img" aria-label="Face With Rolling Eyes Emoji">
          🙄
        </span>
      </h1>
    </Hero>
    <center>
      <p style={{ fontSize: "25px" }}>
        <Link to="/">Back to Bands!</Link>
      </p>
    </center>
    <Footer />
  </div>
);

export default NoMatch;

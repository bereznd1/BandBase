import React from "react";
import { Col, Row, Container } from "../../components/Grid";
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
      <p style={{fontSize: "25px"}}><Link to="/">Back to Bands!</Link></p>
    </center>
    <Footer />
  </div>
);

export default NoMatch;

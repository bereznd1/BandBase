//=============================================
//This page creates an API for requests that are sent by the Front-End pages.
//It defines methods that those pages will call, which will send different types of HTTP requests to a certain URL.
//The api routing of the app (found in the "routes" folder in the main "BandBase" directory) defines what happens when a request hits a particular URL.
//==============================================

import axios from "axios";

export default {
  // Gets all bands
  getBands: function() {
    return axios.get("/api/bands");
  },
  // Gets the band with the given id
  getBand: function(id) {
    return axios.get("/api/bands/" + id);
  },

  // Deletes the band with the given id
  deleteBand: function(id) {
    return axios.delete("/api/bands/" + id);
  },

  //Updates the band with the given id
  updateBand: function(updatedBand) {
    return axios.put("/auth/update/" + updatedBand.id, updatedBand);
  },

  //Saves a new band to the DB
  saveBand: function(bandData) {
    return axios.post("/auth/signup", bandData);
  },

  //Allows users to log in
  userLogin: function(userData) {
    return axios.post("/auth/login", userData);
  },

  //Allows users to log out
  userLogout: function() {
    return axios.post("/auth/logout");
  }
};

//importing necessary components
import React from "react";
import "./DeleteBtn.css";

//Exporting the component that will be rendered to the page
const DeleteBtn = props => (
  <span className="delete-btn" {...props}>
    ✗ Delete Profile
  </span>
);

export default DeleteBtn;

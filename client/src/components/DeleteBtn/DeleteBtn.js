//importing necessary components
import React from "react";

//Exporting the component that will be rendered to the page
const DeleteBtn = props => (
  <span className="btn btn-danger" {...props}>
    ✗ Delete Profile
  </span>
);

export default DeleteBtn;

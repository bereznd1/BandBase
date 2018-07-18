import React from "react";

//Exporting the component that will be rendered to the page
export const FormBtn = props => (
  <button
    {...props}
    style={{ float: "right", marginBottom: 10 }}
    className="btn btn-success"
  >
    {props.children}
  </button>
);

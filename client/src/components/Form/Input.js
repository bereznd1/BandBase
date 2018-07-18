import React from "react";

//Exporting the component that will be rendered to the page
export const Input = props => (
  <div className="form-group">
    <input className="form-control" {...props} />
  </div>
);

import React from "react";

//Exporting the component that will be rendered to the page
export const Select = props => (
  <div className="form-group">
    <select className="form-control" {...props}>
        {props.children}
    </select>
  </div>
);

import React from "react";

//Exporting the component that will be rendered to the page
export const TextArea = props => (
  <div className="form-group">
    <textarea className="form-control" rows="20" {...props} />
  </div>
);

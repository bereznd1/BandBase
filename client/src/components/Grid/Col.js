import React from "react";

//This component is the equivalent of a Bootstrap Column
export const Col = ({ size, children }) => (
  <div className={size.split(" ").map(size => "col-" + size).join(" ")}>
    {children}
  </div>
);

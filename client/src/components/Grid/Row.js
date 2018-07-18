import React from "react";

//This component is the equivalent of a Bootstrap Row
export const Row = ({ fluid, children }) => (
  <div className={`row${fluid ? "-fluid" : ""}`}>{children}</div>
);

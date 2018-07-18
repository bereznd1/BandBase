import React from "react";

//This component is the equivalent of a Bootstrap Container
export const Container = ({ fluid, children }) => (
  <div className={`container${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);

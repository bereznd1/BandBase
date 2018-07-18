// =======================================
// This component is exported and used within the Sign Up form & the Update Form.
// It is used to display the Front End validation errors that are created when the user types in an incorrect format in one of the fields.
// =======================================

import React from "react";

const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>
            {fieldName} {formErrors[fieldName]}
          </p>
        );
      } else {
        return "";
      }
    })}
  </div>
);

export default FormErrors;

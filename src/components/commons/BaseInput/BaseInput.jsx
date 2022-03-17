import React from "react";

const BaseInput = ({ error, type = "text", label, value, handleChange }) => (
  <>
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={handleChange}
      className="form-control"
    />
    {error && <div className="text-danger">{error}</div>}
  </>
);

export default BaseInput;

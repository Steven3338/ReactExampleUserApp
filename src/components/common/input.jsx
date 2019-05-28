import React from "react";

// const Input = ({ type, name, label, value, error, onChange }) => {
// the ...rest operator allows you to get the other properties from the props operator, can be implement where the key and value properties and/or functions are named the same
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        // this prevents the input from having its own state by binding it to the form state
        //value={value}             // no longer needed with the rest operator
        // this operator allows us to update the state (state common to this form) of this input
        //onChange={onChange}       // no longer needed with the rest operator
        // can be used to display plain text or obscure the entry in the case of a password
        //type={type}               // no longer needed with the rest operator
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {/* if error is truthy then this expression will be returned // otherwise */}
      {/* if it is falsy then this expression willbe ignored */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    // computed properties
    // whatever name is at runtime, that will be used to set key
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    // if errors is truthy (2nd errors below), then we will set errors equal to errors otherwise we will set errors equal to an empty object
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    // since we are setting the target property dynamically, we should use the bracket notation instead of the dot notation
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSearch = ({ currentTarget: input }) => {};

  renderButton(label) {
    return (
      <button
        //   disables button unless the value returned by this.validate is truthy
        disabled={this.validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  // type is given the default value text but a different argument can be passed to allow a password to be obscured for instance
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        // prevents the component from having its own state
        value={data[name]}
        // tracks the state in the virtual DOM
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        // prevents the component from having its own state
        value={data[name]}
        // tracks the state in the virtual DOM
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;

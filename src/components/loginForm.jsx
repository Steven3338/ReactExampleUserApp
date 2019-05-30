import React, { Component } from "react";
import Joi from "joi-browser";
import auth from "../services/authServices";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
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
    // whatever [name] is a runtime, that will be used to set key
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    // preventDefault prevents the default behavior of this event. In this
    // case submitting the form to a server, which causes a full page reload.
    e.preventDefault();

    const errors = this.validate();
    // if errors is truthy (2nd errors below), then we will set errors equal to errors otherwise we will set errors equal to an empty object
    // errors property should never be null, even if it has to be set to an empty object
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
    // call the server
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    const data = { ...this.state.data };
    // currentTarget allows us to get our input field
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    const { data } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          {/* the htmlFor attribute is the id of a given input field with
          this, when the user click on the label the referenced input field
          automatically gets focus */}
          <label htmlFor="email">Email address</label>
          <input
            // single source of truth, using props to set its value
            value={data.email}
            onChange={this.handleChange}
            id="email"
            name="email"
            type="text"
            className="form-control"
            // placeholder="Enter email"
          />
          {this.state.errors.email && (
            <div className="alert alert-danger">{this.state.errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            // single source of truth, using props to set its value
            // controlled elements don't have their own state, they get all the data via props
            // that notify changes to the elements by raising events
            value={data.password}
            onChange={this.handleChange}
            id="password"
            name="password"
            type="password"
            className="form-control"
            // placeholder="Password"
          />
          {this.state.errors.password && (
            <div className="alert alert-danger">
              {this.state.errors.password}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;

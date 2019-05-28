import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authServices";

class RegisterForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const response = await auth.register(this.state.data);
      // use the bracket notation to access this property
      //auth.loginWithJwt(response.headers["x-auth-token"]);
      auth.loginWithJwt(response.data);
      // this.props.history.push("/");

      // this code cases a full reload of the application
      // as a result the App.js componentDidMount life cycle hook will be called again
      // this prevents the situation where someone logs in but the page does not reload and recognize their credentials
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("firstName", "First Name")}
        {this.renderInput("lastName", "Last Name")}
        {this.renderInput("email", "Email Address")}
        {this.renderInput("password", "Password", "Password")}
        {this.renderButton("Submit")}
      </form>
    );
  }
}

export default RegisterForm;

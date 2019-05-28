import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authServices";

class AddressForm extends Form {
  constructor() {
    super();
    this.todaysDate = this.getTodaysDate();
  }

  state = {
    data: {
      street: "",
      city: "",
      county: "",
      zip: "",
      state: "",
      country: "",
      moveInDate: "",
      moveOutDate: "",
      userId: 0,
      id: 0
    },
    errors: {}
  };

  schema = {
    street: Joi.string()
      .optional()
      .label("Street"),
    city: Joi.string()
      .optional()
      .label("City"),
    county: Joi.string()
      .optional()
      .label("County"),
    zip: Joi.string()
      .optional()
      .label("Zip Code"),
    state: Joi.string()
      .optional()
      .label("State"),
    country: Joi.string()
      .optional()
      .label("Country"),
    moveInDate: Joi.string()
      //   .min(1 / 1 / 1900)
      //   .max(this.todaysDate)
      .optional()
      .label("Today's Date"),
    moveOutDate: Joi.string()
      //   .min(1 / 1 / 1900)
      //   .max(this.todaysDate)
      .allow("")
      .label("Move out Date"),
    userId: Joi.number().required(),
    id: Joi.number().required()
  };

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      try {
        const promise = await auth.getAddress(this.props.match.params.id);
        console.log(promise);
        this.setState({ data: promise.data });
      } catch (ex) {
        this.setState({ error: ex });
      }
    }
  }

  getTodaysDate() {
    var today = new Date();
    var date = `${today.getMonth() +
      1} / ${today.getDay()} / ${today.getFullYear()}`;
    return date;
  }

  doSubmit = async () => {
    try {
      const address = this.state.data;
      await auth.updateAddress(this.props.match.params.id, address);
      window.location = "/profile";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data } = this.state;
    // console.log(this.states.data);
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("street", "Street Address", data)}
          {this.renderInput("city", "City")}
          {this.renderInput("county", "County")}
          {this.renderInput("zip", "Zip Code")}
          {this.renderInput("state", "State")}
          {this.renderInput("country", "Country")}
          {this.renderInput("moveInDate", "Move in Date")}
          {this.renderInput("moveOutDate", "Move out Date")}
          {this.renderButton("Submit")}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => this.props.history.replace("/profile")}
            style={{ marginLeft: 20 }}
          >
            Return to Profile
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddressForm;

import React from "react";
import auth from "../services/authServices";
import Form from "../components/common/form";
import Joi from "joi-browser";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class ProfileForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      dateOfBirth: ""
    },
    addresses: [],
    cases: [],
    errors: {}
  };

  schema = {
    id: Joi.optional(),
    firstName: Joi.string()
      .optional()
      .label("First Name"),
    lastName: Joi.string()
      .optional()
      .label("Last Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password"),
    phone: Joi.number()
      .integer()
      .optional()
      .min(1000000000)
      .max(9999999999)
      .label("Phone Number"),
    dateOfBirth: Joi.string()
      .optional()
      .label("Date of Birth")
  };

  columns = [
    {
      path: "street",
      label: "Street"
    },
    {
      path: "city",
      label: "City"
    },
    {
      path: "county",
      label: "County"
    },
    {
      path: "zip",
      label: "Zip"
    },
    {
      path: "state",
      label: "State"
    },
    {
      path: "country",
      label: "Country"
    },
    {
      path: "moveInDate",
      label: "Move in Date"
    },
    {
      path: "moveOutDate",
      label: "Move out Date"
    },
    {
      key: "edit",
      content: address => <Link to={`profile/${address.id}`}>Edit</Link>
    },
    {
      key: "delete",
      //   instead of setting this to a React element, we set it to a function that takes a parameter "user" and returns a React element
      content: item => (
        <button
          onClick={() => this.handleAddressDelete(item)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  async componentDidMount() {
    const promise = await auth.getUserProfile();
    const promise2 = await auth.getUserAddresses();
    this.setState({ data: promise.data, addresses: promise2.data });
  }

  doSubmit = async () => {
    const newJwt = await auth.updateUserProfile(this.state.data);
    if (newJwt !== null && newJwt.data !== false) {
      auth.logout();
      await auth.loginWithJwt(newJwt.data);
    }

    // Redirect the user  to /movies; the push method allows the user to use the back button
    // this.props.history.push("/");
  };

  renderAddressTable() {
    const { addresses } = this.state;
    var output = {};
    const oneAddress = (
      <React.Fragment>
        <h1>Address</h1>
        <Table columns={this.columns} data={addresses} />
      </React.Fragment>
    );
    const twoAddresses = (
      <React.Fragment>
        <h1>Addresses</h1>
        <Table columns={this.columns} data={addresses} />
      </React.Fragment>
    );

    addresses.length > 1 ? (output = twoAddresses) : (output = oneAddress);

    return addresses.length ? output : null;
  }

  handleAddressDelete = async address => {
    const originalAddresses = this.state.addresses;
    const addresses = originalAddresses.filter(a => a.id !== address.id);
    this.setState({ addresses });

    try {
      await auth.deleteAddress(address.id);
    } catch (ex) {
      if (ex.response && ex.response === 404)
        toast.error("This has already been removed.");

      this.setState({ addresses: originalAddresses });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>User Profile</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("dateOfBirth", "Date of Birth")}
          {this.renderButton("Save")}
        </form>
        <Link
          to="/profile/new"
          className="btn btn-primary"
          style={{ marginBottom: 20, marginTop: 20 }}
        >
          Add Address
        </Link>
        {this.renderAddressTable(this.state.addresses)}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => this.props.history.replace("/")}
        >
          Return to Home
        </button>
      </React.Fragment>
    );
  }
}

export default ProfileForm;

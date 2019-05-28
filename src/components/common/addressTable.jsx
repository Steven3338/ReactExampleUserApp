import React, { Component } from "react";
import Table from "./table";
import auth from "../../services/authServices";

class AddressTable extends Component {
  state = {};

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
      key: "delete",
      //   instead of setting this to a React element, we set it to a function that takes a parameter "user" and returns a React element
      content: item => (
        <button
          onClick={() => this.props.handleAddressDelete(item)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  renderAddressTable(data) {
    var output = {};
    const oneAddress = (
      <React.Fragment>
        <h1>Address</h1>
        <Table columns={this.columns} data={data} />
      </React.Fragment>
    );
    const twoAddresses = (
      <React.Fragment>
        <h1>Addresses</h1>
        <Table columns={this.columns} data={data} />
      </React.Fragment>
    );

    data.length > 1 ? (output = twoAddresses) : (output = oneAddress);

    return data.length ? output : null;
  }
}

export default AddressTable;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class UserTable extends Component {
  columns = [
    {
      path: "email",
      label: "Email",
      content: user => <Link to={`users/${user.id}`}>{user.email}</Link>
    },
    {
      path: "firstName",
      label: "First Name"
    },
    {
      path: "lastName",
      label: "LastName"
    },
    {
      key: "delete",
      //   instead of setting this to a React element, we set it to a function that takes a parameter "user" and returns a React element
      content: item => (
        <button
          onClick={() => this.props.onDelete(item)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { data } = this.props;
    return <Table columns={this.columns} data={data} />;
  }
}

export default UserTable;

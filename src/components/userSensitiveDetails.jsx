import React, { Component } from "react";
import auth from "../services/authServices";
import Table from "./common/table";
import { Link } from "react-router-dom";

class UserSensitiveDetails extends Component {
  state = {
    userProperties: [],
    userAddresses: [],
    userCases: []
  };

  columnsUser = [
    {
      path: "id",
      label: "Id"
    },
    {
      path: "firstName",
      label: "First Name"
    },
    {
      path: "lastName",
      label: "Last Name"
    },
    {
      path: "email",
      label: "Email"
    },
    {
      path: "isAdmin",
      label: "Administrator"
    },
    {
      path: "password",
      label: "Password"
    },
    {
      path: "phone",
      label: "Phone"
    },
    {
      path: "dateOfBirth",
      label: "Date of Birth"
    },
    {
      path: "gender",
      label: "Gender"
    }
  ];

  columnsAddresses = [
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
    }
  ];

  async componentDidMount() {
    const promise = await auth.getUserSensitiveDetails(
      this.props.match.params.id
    );

    this.setState({
      userProperties: [
        {
          id: promise.data.id,
          firstName: promise.data.firstName,
          lastName: promise.data.lastName,
          email: promise.data.email,
          isAdmin: promise.data.isAdmin ? "True" : "False",
          password: promise.data.password,
          phone: promise.data.phone,
          dateOfBirth: promise.data.dateOfBirth,
          gender: promise.data.gender
        }
      ],
      userAddresses: promise.data.addresses,
      userCases: promise.data.cases
    });
  }

  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return <td>{item[column.path]}</td>;
  };

  renderCaseHeadline = () => {
    return this.state.userCases.length === 1 ? (
      <h3>
        <strong>Customer Case</strong>
      </h3>
    ) : (
      <h3>
        <strong>Customer Cases</strong>
      </h3>
    );
  };

  renderCaseBody = () => {
    return this.state.userCases.map(c => (
      <React.Fragment key={c.id}>
        <h5>
          <Link to={`cases/${c.id}`}>
            <strong>Subject: </strong>
            {c.subject}
            <br /> Status: The Case is {c.timeToResolution ? "Closed" : "Open"}
          </Link>
        </h5>
        <h6>
          {c.messages.map(m => (
            <p key={`${c.id}${m.id}`}>
              <strong>Message Originated by User Id: {m.originatorId}</strong>
              <br />
              {m.messageText}
            </p>
          ))}
        </h6>
      </React.Fragment>
    ));
  };

  render() {
    return (
      <div>
        <Table columns={this.columnsUser} data={this.state.userProperties} />
        <Table
          columns={this.columnsAddresses}
          data={this.state.userAddresses}
        />
        {this.state.userCases && this.renderCaseHeadline()}
        {this.state.userCases && this.renderCaseBody()}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => this.props.history.replace("/users")}
        >
          Return to User List
        </button>
      </div>
    );
  }
}

export default UserSensitiveDetails;

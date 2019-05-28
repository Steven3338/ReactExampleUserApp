import React, { Component } from "react";
import auth from "../services/authServices";
import Table from "./common/table";
import { Link } from "react-router-dom";

class CaseTable extends Component {
  state = {
    data: [
      {
        id: "",
        subject: "",
        dateTimeOfInitialMessage: "",
        timeToResolution: ""
      }
    ]
  };

  columns = [
    {
      path: "subject",
      label: "Subject",
      content: caseObj => (
        <Link to={`cases/${caseObj.id}`}>{caseObj.subject}</Link>
      )
      // key: "edit",
      // content: address => <Link to={`profile/${address.id}`}>Edit</Link>
    },
    {
      path: "dateTimeOfInitialMessage",
      label: "Initiated On"
    },
    {
      path: "timeToResolution",
      label: "Resolved On"
    }
  ];

  async componentDidMount() {
    const promise = await auth.getUserCases();
    this.setState({ data: promise.data });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Cases</h1>
        {this.state.data && (
          <Table columns={this.columns} data={this.state.data} />
        )}
        <Link
          to="/users/cases/new"
          className="btn btn-primary"
          style={{ marginRight: 20 }}
        >
          New Case
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => this.props.history.push("/")}
        >
          Return to Home
        </button>
      </React.Fragment>
    );
  }
}

export default CaseTable;

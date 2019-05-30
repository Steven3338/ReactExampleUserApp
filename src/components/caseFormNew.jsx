import React, { Component } from "react";
import auth from "../services/authServices";

class CaseFormNew extends Component {
  state = {
    data: { subject: "" }
  };

  handleChange = props => {
    const data = { ...this.state.data };
    data.subject = props.currentTarget.value;

    this.setState({ data });
  };

  handleSubmit = e => {
    // preventDefault prevents the default behavior of this event. In this
    // case submitting the form to a server, which causes a full page reload.
    e.preventDefault();

    this.doSubmit();
  };

  doSubmit = async () => {
    const promise = await auth.postNewCase(this.state.data);
    console.log(promise);
    if (promise) this.props.history.push(`/users/cases/${promise.data.id}`);
  };

  render() {
    return (
      <React.Fragment>
        <h1> Hello from New Case Form </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {/* the htmlFor attribute is the id of a given input field with
            this, when the user click on the label the referenced input field
            automatically gets focus */}
            <label htmlFor="newCase">
              Please Enter the Subject of the New Case
            </label>
            <input
              type="text"
              id="newCase"
              name="newCase"
              value={this.state.data.subject}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter Case Subject"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: 20 }}
            disabled={this.state.data.subject === ""}
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default CaseFormNew;

import React, { Component } from "react";
import { toast } from "react-toastify";
import auth from "../services/authServices";
import Joi from "joi-browser";

class CaseFormExisting extends Component {
  state = {
    case: {
      id: "",
      subject: "",
      dateTimeOfInitialMessage: "",
      timeToResolution: "",
      closedById: ""
    },
    errors: {},
    messages: [
      {
        id: "",
        dateTimeOfMessage: "",
        messageText: "",
        originatorId: ""
      }
    ],
    newMessage: { messageText: "" },
    closedBy: { userId: "" },
    from: {}
  };

  schema = {
    id: Joi.number().optional(),
    subject: Joi.string()
      .required()
      .label("Subject"),
    dateTimeOfInitialMessage: Joi.string().Optional,
    timeToResolution: Joi.string().allow(""),
    closedById: Joi.allow("")
  };

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const promise = await auth.getUserCaseMessages(
        this.props.match.params.id
      );
      if (promise.data.id) {
        this.setState({
          case: {
            id: promise.data.id,
            subject: promise.data.subject,
            dateTimeOfInitialMessage: promise.data.dateTimeOfInitialMessage,
            closedById: promise.data.closedById,
            timeToResolution:
              promise.data.timeToResolution !== null
                ? promise.data.timeToResolution
                : ""
          }
        });
      }
      this.setState({ messages: promise.data.messages });
    }
  }

  handleCloseCurrentCase = async () => {
    try {
      await auth.handleCaseClose(this.props.match.params.id);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response === 404)
        toast.error("This case has already been closed.");
    }
  };

  renderValueComponent(value, label) {
    return (
      <div className="form-group">
        <p>{label}</p>
        <p className="form-control">{value}</p>
      </div>
    );
  }

  handleChange = props => {
    const message = { ...this.state.newMessage };
    // since we are setting the target property dynamically, we should use the bracket notation instead of the dot notation
    // data.newMessage = this.props.target.input.value;
    message.messageText = props.currentTarget.value;

    this.setState({ newMessage: message });
  };

  handleSubmit = async () => {
    await auth.postNewMessage(
      this.props.match.params.id,
      this.state.newMessage
    );
  };

  render() {
    return (
      <div>
        <h1>
          Case Status{" "}
          {this.state.case.timeToResolution !== "" ? "Closed" : "Open"}
        </h1>
        {this.renderValueComponent(this.state.case.subject, "Subject")}
        {this.renderValueComponent(
          this.state.case.dateTimeOfInitialMessage,
          "Case Originated On"
        )}
        {this.renderValueComponent(
          this.state.case.timeToResolution
            ? this.state.case.timeToResolution
            : "Case is Currently Open",
          "Case Closed On"
        )}
        {this.state.case.timeToResolution !== ""
          ? this.renderValueComponent(
              `User Id: ${this.state.case.closedById}`,
              "Case Closed By"
            )
          : null}
        {this.state.messages.map(m => (
          <div className="form-group" key={m.id}>
            <p>
              <strong>Message:</strong>
              <br /> Submitted On: {m.dateTimeOfMessage}
              <br /> Originator Id: {m.originatorId}
            </p>
            <p className="form-control">{m.messageText}</p>
          </div>
        ))}
        {this.state.case.timeToResolution === "" ? (
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="newMessage">
                <strong>New Message</strong>
              </label>
              <input
                // single source of truth, using props to set its value
                // controlled elements don't have their own state, they get all the data via props
                // that notify changes to the elements by raising events
                value={this.state.newMessage.text}
                onChange={this.handleChange}
                id="newMessage"
                name="newMessage"
                type="text"
                className="form-control"
                placeholder="Enter Text Here"
              />
            </div>
            <button
              disabled={this.state.newMessage.messageText === ""}
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              Submit Message
            </button>
          </form>
        ) : null}
        {this.state.case.timeToResolution === "" ? (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleCloseCurrentCase}
            style={{ marginRight: 20 }}
          >
            Close the Case
          </button>
        ) : null}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => this.props.history.replace("/")}
        >
          Return to Home
        </button>
      </div>
    );
  }
}

export default CaseFormExisting;

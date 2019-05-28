import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import auth from "../services/authServices";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    const userClaims = auth.getCurrentUser();
    const isAdmin = user
      ? userClaims.isAdmin.toLowerCase() === "true" ||
        userClaims.isAdmin === true
        ? true
        : false
      : false;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          UserManagement
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </NavLink>
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
              </React.Fragment>
            )}
            {isAdmin && (
              <NavLink className="nav-item nav-link" to="/users">
                Users
              </NavLink>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/profile">
                  {user.Email}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/users/cases">
                  Cases
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;

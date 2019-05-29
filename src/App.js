import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import Users from "./components/users";
import UserSensitiveDetails from "./components/userSensitiveDetails";
import CaseFormExisting from "./components/casesFormExisting";
import CaseFormNew from "./components/caseFormNew";
import CaseTable from "./components/caseTable";
import ProfileForm from "./components/profileForm";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import AddressForm from "./components/addressForm";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import Home from "./components/home";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import auth from "./services/authServices";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/users/cases/new" component={CaseFormNew} />
            <ProtectedRoute
              path="/users/cases/:id"
              component={CaseFormExisting}
            />
            <ProtectedRoute path="/users/cases" component={CaseTable} />
            <ProtectedRoute
              path="/users/:id"
              component={UserSensitiveDetails}
            />
            <ProtectedRoute path="/users/" component={Users} />
            <ProtectedRoute path="/profile/:id" component={AddressForm} />
            {/* <ProtectedRoute path="/profile/new" component={AddressForm} /> */}
            <ProtectedRoute path="/profile/" component={ProfileForm} />
            <Route path="/register/" component={RegisterForm} />
            <Route path="/login/" component={LoginForm} />
            <Route path="/logout/" component={Logout} />
            <Route path="/not-found/" component={NotFound} />
            <Route exact path="/" component={Home} />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

import axios from "axios";
import { toast } from "react-toastify";

// with will get the variable from the appropriate root file, depending on the environment; production, test, development
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// don't care about intercepting success
// axios.interceptors.response.use(success, error);
// with this interceptor we are handling unexpected errors globally
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.state < 500;

  // if unexpected error
  if (!expectedError) {
    toast("An unexpected error occurred.");
  }

  // this code creates a rejected promise
  // include the error in our promise object
  return Promise.reject(error);
});

function setJwt(jwt) {
  // we are telling axios, whenever you want to send a http request make sure to include this header in the request
  // we need to get the token from local storage but do not want to talk to local storage directly, that is the responsibility of a function in the authService object
  // now whenever we have an http request, this token will be included, if the user is not logged in the token will be undefined, so this header will not be set.
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

import jwtDecode from "jwt-decode";
import http from "./httpServices";
const apiEndpointForLogin = "/login";
const apiEndPointForAdmin = "/admin";
const apiEndPointForRegister = "/register";
const apiEndPointForUser = "/user";
const apiEndPointForUserAddresses = "/useraddresses";
const apiEndPointForUserCases = "/usercase";
const apiEndPointForUserMessages = "/userMessage";
const tokenKey = "token";

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    // this returns a JSON Web Token
    const jwt = getJwt();
    // now we need to decode this using a libary called jwtdecode
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpointForLogin, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function register(user) {
  return http.post(apiEndPointForRegister, {
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName
  });
}

export function getUserList() {
  try {
    const jwt = getJwt();
    // Get request with Bearer token
    const promise = http.get(apiEndPointForAdmin, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (error) {
    return null;
  }
}

export function getUserSensitiveDetails(id) {
  try {
    const jwt = getJwt();
    // Get request with Bearer token
    const promise = http.get(`${apiEndPointForAdmin}/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (error) {
    return null;
  }
}

export function deleteUser(id) {
  try {
    const jwt = getJwt();
    http.delete(`${apiEndPointForAdmin}/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
  } catch (errror) {}
}

export function getUserAddresses() {
  try {
    const jwt = getJwt();
    // Get request with Bearer token
    const promise = http.get(apiEndPointForUserAddresses, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (error) {
    return null;
  }
}

export function getUserProfile() {
  try {
    const jwt = getJwt();
    // Get request with Bearer token
    const promise = http.get(apiEndPointForUser, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (error) {
    return null;
  }
}

export function updateUserProfile(data) {
  try {
    const jwt = getJwt();
    const newJwt = http.put(`${apiEndPointForUser}`, data, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    if (newJwt !== null && newJwt !== false) return newJwt;
    return false;
  } catch (error) {}
}

export function deleteAddress(id) {
  try {
    const jwt = getJwt();
    http.delete(`${apiEndPointForUserAddresses}/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
  } catch (error) {}
}

export function getAddress(id) {
  try {
    const jwt = getJwt();
    // Get request with Bearer token
    const promise = http.get(`${apiEndPointForUserAddresses}/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (error) {
    return null;
  }
}

export function updateAddress(data) {
  const jwt = getJwt();
  if (data.id) {
    try {
      const promise = http.put(
        `${apiEndPointForUserAddresses}/${data.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      );
      return promise;
    } catch (error) {
      return null;
    }
  }
  try {
    const promise = http.post(`${apiEndPointForUserAddresses}`, data, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (error) {
    return null;
  }
}

export function getUserCases() {
  try {
    const jwt = getJwt();
    const promise = http.get(apiEndPointForUserCases, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (ex) {
    return null;
  }
}

export function postNewCase(data) {
  const jwt = getJwt();
  try {
    const promise = http.post(apiEndPointForUserCases, data, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (ex) {}
}

export function handleCaseClose(path) {
  try {
    const jwt = getJwt();
    http.put(`${apiEndPointForUserCases}/${path}`, null, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
  } catch (ex) {}
}

export function getUserCaseMessages(id) {
  try {
    const jwt = getJwt();
    const promise = http.get(`${apiEndPointForUserMessages}/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (ex) {
    return null;
  }
}

export function postNewMessage(path, data) {
  try {
    const jwt = getJwt();
    const promise = http.post(`${apiEndPointForUserMessages}/${path}`, data, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return promise;
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  getUserList,
  getUserSensitiveDetails,
  getUserProfile,
  updateUserProfile,
  getUserAddresses,
  getAddress,
  updateAddress,
  getUserCases,
  postNewCase,
  handleCaseClose,
  getUserCaseMessages,
  postNewMessage,
  register,
  deleteUser,
  deleteAddress
};

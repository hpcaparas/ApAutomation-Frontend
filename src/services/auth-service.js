import axios from "axios";
import { API_URL } from '../Constants'

const register = (username, email, password) => {
  return axios.post(`${API_URL}api/auth/signup`, {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(`${API_URL}api/auth/signin`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  console.log("logging out...")
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
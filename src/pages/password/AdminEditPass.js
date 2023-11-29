import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { API_URL } from '../../Constants'

export default function AdminEditPass() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const [pwData, setPwData] = useState({
    newPassword: "",
    username: "",
  });

  const { name, username, email, password } = user; 

  const { username2, newPassword } = user; 

  const onInputChange = (e) => {
    setPwData({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    pwData.username = user.username;
    await axios.post(`${API_URL}api/admin/employee/resetPass/`, pwData, { headers: authHeader() });
    navigate("/admin/adminChangePass");
  };

  const loadUser = async () => {
    const result = await axios.get(`${API_URL}api/admin/employee/${id}`, { headers: authHeader() });
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Password</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Set new password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/adminChangePass">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../../Constants'
import authHeader from "../../services/auth-header";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();
 
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    dept:[],
    role:[]
  });

  const { name, username, email, dept, role } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onRoleChange = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    loadUser();
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get(`${API_URL}api/common/departments`);
      const results = []
      // Store results in the results array
      console.log(data)
      data.forEach((value) => {
        results.push({
          key: value.id,
          value: value.deptName
        });
      });
      // Update the options state
      setOptions(
        results
      )
      console.log(options)
    }

    // Trigger the fetch
    fetchData();
  }, []);

  const userRoles = [
    {key:"", value:""},
    {key:"ROLE_ADMIN", value: "Administrator"}, 
    {key:"ROLE_USER", value: "User"}
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    //return;
    await axios.put(`${API_URL}api/admin/employee/${id}`, user, { headers: authHeader() });
    navigate("/admin/adminCreateUser");
  };

  const loadUser = async () => {
    const result = await axios.get(`${API_URL}api/admin/employee/${id}`, { headers: authHeader() });
    const deptArr = result.data.dept.split(',')
    result.data.dept = deptArr;
    result.data.role = [result.data.roles[0].name];
    console.log(result)
    //result.data.password = "";
    setUser(result.data);
    //setUser({ ...user, role: [result.data.roles[0].name] });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

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
                onChange={(e) => onInputChange(e)}
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
                onChange={(e) => onInputChange(e)}
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
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Department" className="form-label">
                Department
              </label>
              <FormControl fullWidth size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="dept"
                  value={dept}
                  label="Department"
                  multiple
                  onChange={onInputChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {options.map((option) => (
                    <MenuItem key={option.key} value={option.value}>
                      <Checkbox checked={dept.indexOf(option.value) > -1} />
                      <ListItemText primary={option.value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="mb-3">
              <label htmlFor="Role" className="form-label">
                Role
              </label>
              <FormControl fullWidth size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  value={role}
                  label="Role"
                  onChange={onRoleChange}
                >
                   {userRoles.map((item) => (
                    <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/admin/adminCreateUser">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

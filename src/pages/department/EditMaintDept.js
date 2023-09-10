import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../../Constants'
import authHeader from "../../services/auth-header";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function AddMaintDept() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [department, setDepartment] = useState({
    deptId: "",
    deptName: "",
    approverName: "",
    approverId: ""
  });
  const [error, setError] = useState(null);
  const {deptId, deptName, approverName, approverId} = department;

  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadDepartment();

    async function fetchData() {
      // Fetch data
      const { data } = await axios.get(`${API_URL}api/admin/employees`, { headers: authHeader() });
      const results = []
      // Store results in the results array
      data.forEach((value) => {
        results.push({
          key:value.id,
          value:value.name
        });
      });
      setUsers(
        results
      )
    }
    fetchData();
  }, [])

  const onInputChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const updateApprover = (e, key) => {
    const itemKey = key.key.slice(2);
    setDepartment({ ...department, approverName: e.target.value, approverId: itemKey});
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${API_URL}api/common/department/${id}`, department, { headers: authHeader() });
    navigate("/admin/listMaintDept");
  };
  

  const validationSchema = Yup.object().shape({
    deptId: Yup.string().required("This field is required!"),
    deptName: Yup.string().required("This field is required!"),
  });

  const loadDepartment = async () => {
    const result = await axios.get(`${API_URL}api/common/department/${id}`, { headers: authHeader() });
    //result.data.password = "";
    setDepartment(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Department</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="deptId" className="form-label">
              Enter GL code
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter GL code"
                name="deptId"
                value={deptId}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deptName" className="form-label">
                Department Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Department Name"
                name="deptName"
                value={deptName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Approver" className="form-label">
                Approver
              </label>
              <FormControl fullWidth size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  input=""
                  name="approverName"
                  value={approverName}
                  label="Approver"
                  onChange={updateApprover}
                >
                   {users.map((item) => (
                    <MenuItem key={item.key} value={item.value}>{item.value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/admin/listMaintDept">
              Cancel
            </Link>
          </form>
        </div>
      </div>
      <div>
        {error ? <p>An error occurred: {error.message}</p> : null}
    </div>
    </div>
  );
}

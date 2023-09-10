import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../../Constants'
import authHeader from "../../services/auth-header";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddMaintType() {
  let navigate = useNavigate();

  const { typeId } = useParams();

  const [type, setType] = useState({
    id: "",
    typeName: ""
  });
  const [error, setError] = useState(null);
  const {id, typeName} = type;

  useEffect(() => {
    loadType();
  }, [])

  const onInputChange = (e) => {
    setType({ ...type, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${API_URL}api/common/type/${id}`, type, { headers: authHeader() });
    navigate("/admin/listMaintType");
  };
  

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("This field is required!"),
    typeName: Yup.string().required("This field is required!"),
  });

  const loadType = async () => {
    console.log(typeId);
    const result = await axios.get(`${API_URL}api/common/type/${typeId}`, { headers: authHeader() });
    //result.data.password = "";
    setType(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Type</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
              Enter GL code
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter GL code"
                name="id"
                value={id}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="typeName" className="form-label">
                Type Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Type Name"
                name="typeName"
                value={typeName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/admin/listMaintType">
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

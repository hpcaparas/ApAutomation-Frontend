import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../../Constants'
import authHeader from "../../services/auth-header";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddMaintType() {
  let navigate = useNavigate();

  const [type, setType] = useState({
    typeId: "",
    typeName: ""
  });
  const [error, setError] = useState(null);
  const {typeId, typeName} = type;

  const onInputChange = (e) => {
    setType({ ...type, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    try{
      e.preventDefault();
      await axios.post(`${API_URL}api/common/type`, type, { headers: authHeader() });
      navigate("/admin/listMaintType");
    }catch(err){
      setError(err);
      console.log(err);
    }
    
  };
  

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("This field is required!"),
    typeName: Yup.string().required("This field is required!"),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Type</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="typeId" className="form-label">
              Enter GL code
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter GL code"
                name="typeId"
                value={typeId}
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

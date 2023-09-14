import axios from "axios";
import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import { API_URL } from '../Constants'
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {useSelector } from "react-redux";

export const TransactionApp = () => {

  const { user: currentUser } = useSelector((state) => state.auth);

  const deptOption = currentUser.dept.split(',');

  const [reimbInfo, setReimbInfo] = useState({
    reimb_id:null,
    empName: currentUser.name,
    username: currentUser.username,
    store: "",
    type: "",
    priceWTax:"",
    tax: "",
    remarks:"",
    department:""
  });
  const [file, setFile] = useState(null);

  const formData = new FormData();

  const {username, empName, store, type, priceWTax, tax, remarks, department} = reimbInfo;

  const onInputChange = (e) => {
    setReimbInfo({ ...reimbInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(reimbInfo)
    for (let key in reimbInfo) {
      formData.append(key, reimbInfo[key])
    }
    formData.append('file', file);
    formData.append('filename', file.name);
    
    await axios.post(`${API_URL}api/transaction/reimb/save`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
    
    setOpen(true);
    //navigate("/adminCreateUser");
  };

  const [options, setOptions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get(`${API_URL}api/common/types`);
      const results = []
      // Store results in the results array
      data.forEach((value) => {
        results.push(value.typeId + " - " + value.typeName);
      });
      // Update the options state
      setOptions(results)
    }

    // Trigger the fetch
    fetchData();
  }, []);

  const getDeptList = async (id) => {
    await axios.get(`${API_URL}departments`);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Reimbursement Form</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                name="empName"
                value={empName}
                disabled="true"
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
                  name="department"
                  value={department}
                  label="Department"
                  onChange={onInputChange}
                >
                   {deptOption.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="mb-3">
              <label style={{display:"none"}} htmlFor="Store" className="form-label">
                Source
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Source"
                name="store"
                value={store}
                onChange={(e) => onInputChange(e)}
                style={{display:"none"}}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Type" className="form-label">
                Type
              </label>
              <FormControl fullWidth size="small">
                <Select
                  id="typeDdown"
                  name="type"
                  value={type}
                  label="Type"
                  onChange={(e) => onInputChange(e)}
                >
                  {options.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="mb-3">
              <label htmlFor="priceWTax" className="form-label">
                Price With Tax
              </label>
              <input
                type={"number"}
                className="form-control"
                name="priceWTax"
                value={priceWTax}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tax" className="form-label">
                Tax
              </label>
              <input
                type={"number"}
                className="form-control"
                name="tax"
                value={tax}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="remarks" className="form-label">
                Remarks
              </label>
              <input
                type={"text"}
                className="form-control"
                name="remarks"
                value={remarks}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Upload Image
              </label>
              <input
                type={"file"}
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])} 
              />
            </div>
            
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirmation Dialog"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Your request has been successfully submitted.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>OK</Button>
              </DialogActions>
            </Dialog>
          </form>
        </div>
      </div>
    </div>
  );
}

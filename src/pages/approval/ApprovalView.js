import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from '../../Constants'

export default function ApprovalView() {
  const [approval, setApproval] = useState({
    reimbId: "",
    empName: "",
    store: "",
    type: "",
    priceWTax: 0,
    tax: "",
    remarks: "",
    filename: "",
    department: ""
  });
  const [imageFile_B64,setImageFile] = useState("");
  const [filename,setFilename] = useState("");

  const { id } = useParams();

  useEffect(() => {
    loadApproval();
    console.log(approval);
    //loadImage();
  }, []);

  const loadApproval = async () => {
    const result = await axios.get(`${API_URL}api/transaction/reimb/getById/${id}`);
    //const result2 = await axios.get(`${API_URL}files/download?fileName=${result.data.filename}`);
    console.log(result);
    setApproval(result.data.data);
    setImageFile("data:image/jpg;base64,"+result.data.b64img);
  };

  const loadImage = async () => {
    const result = await axios.get(`${API_URL}files/download?fileName=${filename}`);
    setImageFile("data:image/jpg;base64,"+result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Reimbursement Details</h2>

          <div className="card">
            <div className="card-header">
              Details of reimb id: {approval.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {approval.empName}
                </li>
                <li className="list-group-item">
                  <b>Department:</b>
                  {approval.department}
                </li>
                <li className="list-group-item">
                  <b>Source:</b>
                  {approval.store}
                </li>
                <li className="list-group-item">
                  <b>Type:</b>
                  {approval.type}
                </li>
                <li className="list-group-item">
                  <b>Price:</b>
                  {approval.priceWTax}
                </li>
                <li className="list-group-item">
                  <b>Price:</b>
                  {approval.priceWTax}
                </li>
                <li className="list-group-item">
                  <b>Tax:</b>
                  {approval.tax}
                </li>
                <li className="list-group-item">
                  <b>Remarks:</b>
                  {approval.remarks}
                </li>
                <li className="list-group-item">
                  <b>Image:</b>
                  <img src={imageFile_B64} width="500" height="333"/>
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/approval"}>
            Back to Approval Screen
          </Link>
        </div>
      </div>
    </div>
  );
}
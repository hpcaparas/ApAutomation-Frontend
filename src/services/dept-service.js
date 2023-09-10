import axios from "axios";
import { API_URL } from '../Constants'
import authHeader from "./auth-header";

const submitDept = (id, deptName) => {
    return axios
      .post(`${API_URL}api/common/department`, {
        id,
        deptName,
      },{ headers: authHeader })
      .then((response) => {
        return response.data;
      });
};

const deptService = {
  submitDept
};
  
export default deptService;
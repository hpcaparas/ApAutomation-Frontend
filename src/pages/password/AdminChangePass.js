import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import authHeader from "../../services/auth-header";
import {
    Stack,
    Button,
    Container,
    Typography,
  } from '@mui/material';
  import { API_URL } from '../../Constants'

export default function AdminChangePass() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      const result = await axios.get(`${API_URL}api/admin/employees`, { headers: authHeader() });
      setUsers(result.data);
    };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Change Password
            </Typography>
          </Stack> 
          <div className="py-4">
              <table className="table border shadow">
              <thead>
                  <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Department</th>
                  <th scope="col">Action</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user, index) => (
                  <tr>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.dept}</td>
                      <td>
                        <Link
                            className="btn btn-outline-primary mx-2"
                            to={`/admin/adminEditPass/${user.id}`}
                        >
                            Edit
                        </Link>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
          </div>
      </Container>
    </>
  )
}
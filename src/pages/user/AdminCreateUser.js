import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
  } from '@mui/material';
  import Iconify from '../../components/iconify';

export default function AdminCreateUser() {
    const [users, setUsers] = useState([]);

    const { id } = useParams();
  
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      const result = await axios.get("https://apautomation-backend.azurewebsites.net/employees");
      setUsers(result.data);
    };
  
    const deleteUser = async (id) => {
      await axios.delete(`https://apautomation-backend.azurewebsites.net/employee/${id}`);
      loadUsers();
    };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              User
            </Typography>
            <Button component={Link} to={'/adminAddUser'} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New User
            </Button>
          </Stack> 
          <div className="py-4">
              <table className="table border shadow">
              <thead>
                  <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user, index) => (
                  <tr>
                      <th scope="row" key={index}>
                      {index + 1}
                      </th>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                      <Link
                          className="btn btn-primary mx-2"
                          to={`/adminViewUser/${user.id}`}
                      >
                          View
                      </Link>
                      <Link
                          className="btn btn-outline-primary mx-2"
                          to={`/adminEditUser/${user.id}`}
                      >
                          Edit
                      </Link>
                      <button
                          className="btn btn-danger mx-2"
                          onClick={() => deleteUser(user.id)}
                      >
                          Delete
                      </button>
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
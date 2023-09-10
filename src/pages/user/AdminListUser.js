import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
    Stack,
    Button,
    Container,
    Typography,
  } from '@mui/material';
import Iconify from '../../components/iconify';
import { API_URL } from '../../Constants'
import authHeader from "../../services/auth-header";
import {CustomTablePagination} from '../../common/TablePagination'

export default function AdminCreateUser() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      const result = await axios.get(`${API_URL}api/admin/employees`, { headers: authHeader() });
      setUsers(result.data);
    };
  
    const deleteUser = async (id) => {
      await axios.delete(`${API_URL}api/admin/employee/${id}`, { headers: authHeader() });
      loadUsers();
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              User
            </Typography>
            <Button component={Link} to={'/admin/adminAddUser'} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New User
            </Button>
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
                {(rowsPerPage > 0
                    ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : users
                  ).map((user) => ( 
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.dept}</td>
                      <td>
                        {/* <Link
                            className="btn btn-primary mx-2"
                            to={`/admin/adminViewUser/${user.id}`}
                        >
                            View
                        </Link> */}
                        <Link
                            className="btn btn-outline-primary mx-2"
                            to={`/admin/adminEditUser/${user.id}`}
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
                  {emptyRows > 0 && (
                    <tr style={{ height: 34 * emptyRows }}>
                      <td colSpan={3} />
                    </tr>
                  )}
              </tbody>
              <tfoot>
                  <tr>
                    <CustomTablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={3}
                      count={users.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          'aria-label': 'rows per page',
                        },
                        actions: {
                          showFirstButton: true,
                          showLastButton: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </tr>
                </tfoot>
              </table>
          </div>
      </Container>
    </>
  )
}
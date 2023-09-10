import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

export default function ListMaintDept() {
    const [departments, setDepartments] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    useEffect(() => {
        loadDepartments();
    }, []);
  
    const loadDepartments = async () => {
      const result = await axios.get(`${API_URL}api/common/departments`, { headers: authHeader() });
      setDepartments(result.data);
    };
  
    const deleteUser = async (id) => {
      await axios.delete(`${API_URL}api/common/department/${id}`, { headers: authHeader() });
      loadDepartments();
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - departments.length) : 0;

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
              Department
            </Typography>
            <Button component={Link} to={'/admin/addMaintDept'} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Department
            </Button>
          </Stack> 
          <div className="py-4">
              <table className="table border shadow">
              <thead>
                  <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Department Name</th>
                  <th scope="col">Actions</th>
                  </tr>
              </thead>
              <tbody>
                {(rowsPerPage > 0
                    ? departments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : departments
                  ).map((department) => ( 
                    <tr key={department.id}>
                      <td>{department.deptId}</td>
                      <td>{department.deptName}</td>
                      <td style={{ width: 250 }} align="left">
                        <Link
                            className="btn btn-outline-primary mx-2"
                            to={`/admin/editMaintDept/${department.id}`}
                        >
                            Edit
                        </Link>
                        <button
                            className="btn btn-danger mx-2"
                            onClick={() => deleteUser(department.id)}
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
                      count={departments.length}
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
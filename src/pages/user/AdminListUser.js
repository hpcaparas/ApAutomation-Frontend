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
import {CustomTablePagination} from '../../common/TablePagination';
import {  useNavigate } from "react-router-dom";
//import Modal from "../../common/Modal"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {getUsers}  from "../../common/APIs";

function AdminCreateUser() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    let navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      try {
        const result = await axios.get(`${API_URL}api/admin/employees`, { headers: authHeader() });

        setOpenModal(!openModal);
        setUsers(result.data);
      } catch (error) {
        const err = error.response.data.error;
        if(err === "Token Expired"){
          setOpen(true);
          console.error('Error:', err);
          setModalMessage("Session expired. Use must login again.");
        }
        console.error('Error fetching employees:', error);
      }
      
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

    const handleClose = () => {
      setOpen(false);
      localStorage.removeItem("user");
      navigate("/login");
      window.location.reload();
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
                            Deactivate
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

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {"WARNING"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className="btn btn-success mx-2">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Warning</Modal.Header>
        <Modal.Body><p>{modalMessage}</p></Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-primary">OK</Modal.DismissButton>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}

export default AdminCreateUser;
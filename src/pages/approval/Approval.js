import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Stack,
    Container,
    Typography,
  } from '@mui/material';
import Iconify from '../../components/iconify';
import { API_URL } from '../../Constants'
import {CustomTablePagination} from '../../common/TablePagination'
import {useSelector } from "react-redux";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Approval() {
  const [approvals, setApproval] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [confirmationMsg, setConfMsg] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState({});
  const [remarks, setRemarks] = React.useState('');

  const { user: currentUser } = useSelector((state) => state.auth);
  const role = currentUser.roles[0];

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const formData = new FormData();

  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    let result = null;
    if(role == "ROLE_FINANCE"){
      result = await axios.get(`${API_URL}api/transaction/reimb/getApprovals`);
      setApproval(result.data);
    }
  };

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - approvals.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickApprove = (reimbInfo) => {
    setConfMsg("Are you sure you want to approve this item?");
    setSelectedRow(reimbInfo);
    setOpen(true);
  };

  const handleClickReject = () => {
    setConfMsg("Are you sure you want to reject this item?")
    setOpen(true);
  };

  const handleApprove = async () => {
    selectedRow.remarks = remarks;
    console.log(remarks);
    console.log(selectedRow);
    const result = await axios.post(`${API_URL}api/transaction/reimb/approve`, selectedRow);
    loadApprovals();
    console.log(selectedRow);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h4" gutterBottom>
              Approvals
            </Typography>
          </Stack> 
          <div className="py-2">
              <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="col">Emp Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Store</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {(rowsPerPage > 0
                    ? approvals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : approvals
                  ).map((approval) => (
                    <tr key={approval.id}>
                      <td>{approval.empName}</td>
                      <td>
                        {approval.department}
                      </td>
                      <td> 
                        {approval.store}
                      </td>
                      <td>
                        {approval.type}
                      </td>
                      <td style={{ width: 300 }} align="left">
                        <Link
                            className="btn btn-primary mx-2"
                            to={`/approvalView/${approval.id}`}
                        >
                            View
                        </Link>
                        <Button className="btn btn-success mx-2" variant="outlined"onClick={() => handleClickApprove(approval)}>
                          Approve
                        </Button>
                        <button className="btn btn-danger mx-2" onClick={handleClickReject}>
                            Reject
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
                      count={approvals.length}
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
          {"CONFIRMATION"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmationMsg}
          </DialogContentText>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <TextField
              id="outlined-multiline-flexible"
              label="Approver's Remarks"
              multiline
              maxRows={4} 
              value={remarks}
              name="remarks"
              onChange={handleRemarksChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className="btn btn-danger mx-2">
            Cancel
          </Button>
          <Button onClick={handleApprove} autoFocus className="btn btn-success mx-2">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}


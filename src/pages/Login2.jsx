//import * as React from 'react';
import React, {useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CardMedia from '@mui/material/CardMedia';

const defaultTheme = createTheme();

export default function Login2() {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const paperStyle = { padding: 30, height: '80vh', width: 400, margin: "0 auto"}
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]); 
  
    const initialValues = {
      username: "",
      password: "",
    };
  
    const validationSchema = Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
    const handleSubmit = (formValue) => {
      const { username, password } = formValue;
      setLoading(true);
  
      dispatch(login({ username, password }))
        .unwrap()
        .then(() => {
          navigate("/home");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    };
  
    if (isLoggedIn) {
      console.log(isLoggedIn);
      //return <Navigate to="/home" />;
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', width:'100%' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={12}
          sx={{
            backgroundImage: 'url(../../Assets/ExpenseManagement_BGOnly.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardMedia
              component="img"
              alt="bg"
              height="10%"
              width="10%"
              image='ExpenseManagementLogo.png'
              sx={{
                width:"30%"
              }}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              >
              <Form>
                <div className="mb-3" >
                  <label htmlFor="username" className="form-label" style={{ color: "#8da0f0"}}>Username</label >
                  <Field name="username" type="text" className="form-control" style={{ width: "60vh"}}/>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label" style={{ color: "#8da0f0"}}>Password</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ width: "60vh"}}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
              </Form>
            </Formik>
            {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
            )}
          </Box>
        </Grid>
        {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={7} square>
        </Grid> */}
      </Grid>
    </ThemeProvider>
  );
}
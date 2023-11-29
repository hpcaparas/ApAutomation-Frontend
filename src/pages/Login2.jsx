//import * as React from 'react';
import React, {useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CardMedia from '@mui/material/CardMedia';
import ExpenseManagement_BGOnly_Img from '../images/ExpenseManagement_BGOnly.png'
import ExpenseManagementLogo from '../images/ExpenseManagementLogo.png'

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
          xs={12}
          sm={12}
          md={12}
          sx={{
            //backgroundImage: 'url(../../Assets/ExpenseManagement_BGOnly.png)',
            backgroundImage: `url(${ExpenseManagement_BGOnly_Img})`,
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
              image={ExpenseManagementLogo}
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
                <div className="container" >
                  <label htmlFor="username" className="form-label" style={{ color: "#8da0f0"}}>Username</label >
                  <Field name="username" type="text" className="form-control w-auto"/>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="container">
                  <label htmlFor="password" className="form-label" style={{ color: "#8da0f0"}}>Password</label>
                  <Field name="password" type="password" className="form-control w-auto" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="container  pt-3 d-grid gap-2" >
                  <button type="submit" className="btn btn-primary w-auto" disabled={loading} width="100vh">
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
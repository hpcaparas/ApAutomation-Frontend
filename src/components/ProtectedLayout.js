import { useState, useEffect } from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import Sidenav from "../components/SideNav";
import "../css/ProtectedLayout.css";
import Header from "../components/header";
import {useSelector } from "react-redux";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const ProtectedLayout = () => {
  const [open, setOpen] = useState(false);
  //const { user } = useAuth();
  const outlet = useOutlet();
  const { user: currentUser } = useSelector((state) => state.auth);

  const theme = useTheme();
  const minWidthReq = useMediaQuery('(min-width:600px)');

  if (!currentUser) {
    window.localStorage.setItem("user", null);
    return <Navigate to="/" />;
  }
  console.log(open)
  return (
      <div className="homeLayout row">
        <Header onOpenNav={() => setOpen(!open)}/>
          <div  className="mainLayout">
            <Sidenav isOpen={open} onOpenNav={() => setOpen(!open)} minWidthReq={minWidthReq}/> 
            {outlet}
        </div>
        
      </div>
  );
};

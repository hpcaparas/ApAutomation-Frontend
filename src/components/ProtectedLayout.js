import { useState } from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import Sidenav from "../components/SideNav";
import "../css/ProtectedLayout.css";
import Header from "../components/header";
import {useSelector } from "react-redux";

export const ProtectedLayout = () => {
  const [open, setOpen] = useState(false);
  //const { user } = useAuth();
  const outlet = useOutlet();
  const { user: currentUser } = useSelector((state) => state.auth);

  console.log(currentUser);
  if (!currentUser) {
    window.localStorage.setItem("user", null);
    return <Navigate to="/" />;
  }

  return (
    <div className="homeLayout">
      <Sidenav/> 
      <div className="mainLayout">
        <Header onOpenNav={() => setOpen(true)} />
        {outlet}
      </div>
      
    </div>
  );
};

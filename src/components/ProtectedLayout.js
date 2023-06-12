import { useState } from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidenav from "../components/SideNav";
import Navbar from "../components/Navbar";
import "../css/ProtectedLayout.css";
import Header from "../components/header";

export const ProtectedLayout = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="homeLayout">
      <Sidenav/> 
      <div className="mainLayout">
        {/* <Navbar/> */}
        <Header onOpenNav={() => setOpen(true)} />
        {outlet}
      </div>
      
    </div>
  );
};

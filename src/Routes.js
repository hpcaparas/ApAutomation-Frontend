import React, { Fragment, useEffect, useState  } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AdminCreateUser } from "./pages/AdminCreateUser";
import { AdminMaint } from "./pages/AdminMaint";
import { Approval } from "./pages/Approval";
import { TransactionApp } from "./pages/TransactionApp";
import { TransactionHis } from "./pages/TransactionHis";

const loggedInUser = localStorage.getItem("authenticated");
const Routes = () => {
  /* const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []); 
  
  Note: This component is not being used. Refer to App.js for the Route config
  
  */
  return (
      <>
        <Routes>
						<Route path="/" element={<Navigate to="/Homessss" />} />
						<Route path='/home' element={<Home/>} />
						<Route path='/adminCreateUser' element={<AdminCreateUser/>}/>
						<Route path='/adminAddUser' element={<AdminAddUser/>}/>
						<Route path='/adminEditUser/:id' element={<AdminEditUser/>}/>
						<Route path='/adminMaint' element={<AdminMaint/>}/>
						{/* <Route path='/adminPassReset' element={<AdminChangePass/>}/> */}
						<Route path='/approval' element={<Approval/>}/>
						<Route path='/transactionApp' element={<TransactionApp/>}/>
						<Route path='/transactionHis' element={<TransactionHis/>}/>
					</Routes>
      </>
  );
};

export default Routes;

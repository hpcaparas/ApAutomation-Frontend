import React, {useState} from 'react';
 import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	defer
  } from "react-router-dom"; 
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import AdminListUser from './pages/user/AdminListUser';
import AdminAddUser from './pages/user/AdminAddUser';
import AdminEditUser from './pages/user/AdminEditUser';
import AdminEditPass from './pages/password/AdminEditPass';
import ListMaintType from './pages/type/ListMaintType';
import AddMaintType from './pages/type/AddMaintType';
import EditMaintType from './pages/type/EditMaintType';
import ListMaintDept from './pages/department/ListMaintDept';
import AddMaintDept from './pages/department/AddMaintDept';
import EditMaintDept from './pages/department/EditMaintDept';
import AdminChangePass from './pages/password/AdminChangePass';
import Approval from './pages/approval/Approval';
import ApprovalView from './pages/approval/ApprovalView';
import {TransactionApp} from './pages/TransactionApp';
import TransactionAppHistory from './pages/TransactionAppHistory';
import Login from './pages/Login2'
import { AuthLayout } from "./components/AuthLayout";
import { LoginLayout } from "./components/LoginLayout";
import { ProtectedLayout } from "./components/ProtectedLayout";


const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
		const user = window.localStorage.getItem("user");
      	resolve(user);
    }, 3000)
  ); 
  

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<AuthLayout />}
			loader={() => defer({ userPromise: getUserData() })}>
			<Route element={<LoginLayout />}>
				<Route path='/' element={<Login/>} />
				<Route path='login' element={<Login/>} />
			</Route>
			<Route element={<ProtectedLayout />}>
				<Route path='admin/adminCreateUser' element={<AdminListUser/>}/>
				<Route path='home' element={<Home/>} />
				
				<Route path='admin/adminAddUser' element={<AdminAddUser/>}/>
				<Route path='admin/adminEditUser/:id' element={<AdminEditUser/>}/>
				<Route path='admin/adminEditPass/:id' element={<AdminEditPass/>}/>
				<Route path='admin/listMaintType' element={<ListMaintType/>}/>
				<Route path='admin/addMaintType' element={<AddMaintType/>}/>
				<Route path='admin/editMaintType/:id' element={<EditMaintType/>}/>
				<Route path='admin/listMaintDept' element={<ListMaintDept/>}/>
				<Route path='admin/addMaintDept' element={<AddMaintDept/>}/>
				<Route path='admin/editMaintDept/:id' element={<EditMaintDept/>}/>
				<Route path='adminChangePass' element={<AdminChangePass/>}/>
				<Route path='approval' element={<Approval/>}/>
				<Route path='approvalView/:id' element={<ApprovalView/>}/>
				<Route path='transactionApp' element={<TransactionApp/>}/>
				<Route path='transactionHis' element={<TransactionAppHistory/>}/>
			</Route>
		</Route>
	)
);

/* const App = () => {
	return (
	  <Router>
		<div>
			<Routes>
				<Route path='/' element={<Login/>} />
				<Route path='login' element={<Login/>} />
				<Route path='home' element={<Home/>} />
				<Route path='adminCreateUser' element={<AdminCreateUser/>}/>
				<Route path='adminAddUser' element={<AdminAddUser/>}/>
				<Route path='adminEditUser/:id' element={<AdminEditUser/>}/>
				<Route path='adminEditPass/:id' element={<AdminEditPass/>}/>
				<Route path='adminMaint' element={<AdminMaint/>}/>
				<Route path='adminChangePass' element={<AdminChangePass/>}/>
				<Route path='approval' element={<Approval/>}/>
				<Route path='approvalView/:id' element={<ApprovalView/>}/>
				<Route path='transactionApp' element={<TransactionApp/>}/>
				<Route path='transactionHis' element={<TransactionHis/>}/>
			</Routes>
		</div>
	  </Router>
	);
  };
  
  export default App; */

/* const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  ); */




/* export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<AuthLayout />}
			loader={() => defer({ userPromise: getUserData() })}>
			<Route element={<LoginLayout />}>
				<Route path='/' element={<Login/>} />
				<Route path='login' element={<Login/>} />
			</Route>
			<Route element={<ProtectedLayout />}>
				<Route path='home' element={<Home/>} />
				<Route path='adminCreateUser' element={<AdminCreateUser/>}/>
				<Route path='adminAddUser' element={<AdminAddUser/>}/>
				<Route path='adminEditUser/:id' element={<AdminEditUser/>}/>
				<Route path='adminEditPass/:id' element={<AdminEditPass/>}/>
				<Route path='adminMaint' element={<AdminMaint/>}/>
				<Route path='adminChangePass' element={<AdminChangePass/>}/>
				<Route path='approval' element={<Approval/>}/>
				<Route path='approvalView/:id' element={<ApprovalView/>}/>
				<Route path='transactionApp' element={<TransactionApp/>}/>
				<Route path='transactionHis' element={<TransactionHis/>}/>
			</Route>
		</Route>
	)
); */

import React, {useState} from 'react';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	defer
  } from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import AdminCreateUser from './pages/user/AdminCreateUser';
import AdminAddUser from './pages/user/AdminAddUser';
import AdminEditUser from './pages/user/AdminEditUser';
import AdminMaint from './pages/AdminMaint';
import AdminPassReset from './pages/AdminPassReset';
import Approval from './pages/Approval';
import {TransactionApp} from './pages/TransactionApp';
import TransactionHis from './pages/TransactionHis';
import Login from './pages/Login'
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
				<Route path='home' element={<Home/>} />
				<Route path='adminCreateUser' element={<AdminCreateUser/>}/>
				<Route path='adminAddUser' element={<AdminAddUser/>}/>
				<Route path='adminEditUser/:id' element={<AdminEditUser/>}/>
				<Route path='adminMaint' element={<AdminMaint/>}/>
				<Route path='adminPassReset' element={<AdminPassReset/>}/>
				<Route path='approval' element={<Approval/>}/>
				<Route path='transactionApp' element={<TransactionApp/>}/>
				<Route path='transactionHis' element={<TransactionHis/>}/>
			</Route>
		</Route>
	)
);

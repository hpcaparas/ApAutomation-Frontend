import { navData } from "../common/NavData";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import sideNavStyles from "../css/SideNav.module.css";
import { NavLink } from "react-router-dom";
import React, {useState} from 'react';
import SubMenu from './SubMenu';
import {useSelector } from "react-redux";
import styled from 'styled-components';

const SideNav = styled("div")`
    width: 100vh;
    max-width: 300px;
    transition: width 0.3s ease-in-out;
    height: calc(100vh - 38px);
    background-color: rgb(10,25,41);
    padding-top: 28px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    ${props =>
        props.isopen === "false" && props.minwidthreq === "true" ?`
            composes: ${SideNav};
            transition: width 0.3s ease-in-out;
            width: 80px
        `:props.isopen === "false" && props.minwidthreq === "false" ?`
            composes: ${SideNav};
            transition: width 0.3s ease-in-out;
            width: 0px
        `
        :''
    }
`

const SideNavClosed = styled("div")`
    
    transition: width 0.3s ease-in-out;
    width: 80px
`

const MenuBtn = styled("button")`
    align-self: center;
    align-self: flex-start;  
    justify-self: flex-end;
    color: #B2BAC2;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding-left: 20px;
    font-size: 0;
`

export default function Sidenav({isOpen, onOpenNav, minWidthReq}) {
    
    
    //const [open, setopen] = useState(true);

    const { user: currentUser } = useSelector((state) => state.auth);
    const userRole = currentUser.roles[0];
    return (
        <>
            <SideNav isopen={isOpen.toString()} minwidthreq={minWidthReq.toString()}>
                <MenuBtn  onClick={onOpenNav} style={{display: minWidthReq === true  ? 'block' : 'none'}}>
                    {isOpen? <KeyboardDoubleArrowLeftIcon />: <KeyboardDoubleArrowRightIcon />}
                </MenuBtn>

                {navData.map((item, index) => {
                    return <SubMenu userRole={userRole} isopen={isOpen.toString()} item={item} key={index} minWidthReq={minWidthReq} style={{fontSize: `0 !important`}}/>;
                })}
            </SideNav>
            {/* <div style={open?styles.sideNav:styles.sidenavClosed}>
                <button style={styles.menuBtn} onClick={toggleOpen}>
                    {open? <KeyboardDoubleArrowLeftIcon />: <KeyboardDoubleArrowRightIcon />}
                </button>
                
                {navData.map((item, index) => {
                return <SubMenu userRole={userRole} isOpen={open} item={item} key={index} style={styles.menuBtnClosed}/>;
                })}
            </div> */}
        </>
    )
}
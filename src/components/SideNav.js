import { navData } from "../common/NavData";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import styles from "../css/SideNav.module.css";
import { NavLink } from "react-router-dom";
import React, {useState} from 'react';
import SubMenu from './SubMenu';
import {useSelector } from "react-redux";

export default function Sidenav() {
    const [open, setopen] = useState(true);

    const toggleOpen = () => {
        setopen(!open)
    }

    const { user: currentUser } = useSelector((state) => state.auth);
    const userRole = currentUser.roles[0];
    return (
        <div className={open?styles.sidenav:styles.sidenavClosed}>
            <button className={styles.menuBtn} onClick={toggleOpen}>
                {open? <KeyboardDoubleArrowLeftIcon />: <KeyboardDoubleArrowRightIcon />}
            </button>
            
            {navData.map((item, index) => {
              return <SubMenu userRole={userRole} isOpen={open} item={item} key={index} className={styles.menuBtnClosed}/>;
            })}
        </div>
    )
}
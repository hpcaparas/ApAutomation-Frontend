import { navData } from "../common/NavData";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import styles from "../css/SideNav.module.css";
import { NavLink } from "react-router-dom";
import React, {useState} from 'react';
import styled from 'styled-components';
import SubMenu from './SubMenu';


const SidebarWrap = styled.div`
  width: 100%;
`;
export default function Sidenav() {
    const [open, setopen] = useState(true)

    const toggleOpen = () => {
        setopen(!open)
    }
    return (
        <div className={open?styles.sidenav:styles.sidenavClosed}>
            <button className={styles.menuBtn} onClick={toggleOpen}>
                {open? <KeyboardDoubleArrowLeftIcon />: <KeyboardDoubleArrowRightIcon />}
            </button>
            
            {navData.map((item, index) => {
              return <SubMenu isOpen={open} item={item} key={index} className={styles.menuBtnClosed}/>;
            })}
        </div>
    )
}
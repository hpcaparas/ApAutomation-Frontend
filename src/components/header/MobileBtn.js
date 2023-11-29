import React, {useState} from 'react';
import mobileBtnStyles from "../../css/SideNav.module.css";
import {FaBars} from 'react-icons/fa';
export default function Sidenav() {
    const [open, setopen] = useState(true);

    const toggleOpen = () => {
        setopen(!open)
    }
    return(
        <div className="mobileNav">
            <button
                className={mobileBtnStyles.mobileNavBtn}
                onClick={toggleOpen}
            >
                <FaBars size={24}  />
            </button>
        </div>
    )
}
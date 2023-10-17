import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import styles from "../css/SideNav.module.css";



const SubMenu = ({ item, isOpen, userRole }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);


  const SidebarLink = styled(NavLink)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }

  display: ${props =>
  props.role.includes('all') ? 'flex' :
  props.role.includes('ROLE_ADMIN') && userRole === 'ROLE_ADMIN' ? 'flex' :
  props.role.includes('ROLE_FINANCE') && userRole === 'ROLE_FINANCE' ? 'flex' :
  props.role.includes('ROLE_USER') && userRole === 'ROLE_USER' ? 'flex' :
  'none'}
`;

const SidebarLabel = styled.span`
    padding-left: 16px;
`;

const DropdownLink = styled(NavLink)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;
  return (
    <>
      <SidebarLink role={item.roles} to={item.link} onClick={item.subNav && showSubnav} className={isOpen?styles.menuBtnOpen:styles.menuBtnClosed}>
        <div>
          {item.icon}
          <SidebarLabel>{item.text}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.link} key={index} className={isOpen?styles.menuBtnOpen:styles.menuBtnClosed}>
              {item.icon}
              <SidebarLabel>{item.text}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
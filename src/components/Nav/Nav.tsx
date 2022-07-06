import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";
import style from './Nav.module.css'

const Nav = () => {
    return (
        <div className={style.nav}>
            <NavLink to={PATH.PACKS}>Packs</NavLink>
            <NavLink to={PATH.LOGIN}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
            <NavLink to={PATH.PROFILE}>Profile</NavLink>
            <NavLink to={PATH.RECOVERY_PASSWORD}>Recovery password</NavLink>
        </div>
    );
};

export default Nav;
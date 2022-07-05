import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../App";

const Nav = () => {
    return (
        <div className={'nav'}>

            <NavLink to={PATH.PACKS}>Packs</NavLink>
            <NavLink to={PATH.LOGIN}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
            <NavLink to={PATH.PROFILE}>Profile</NavLink>
            <NavLink to={PATH.RECOVERY_PASSWORD}>Recovery password</NavLink>
            <NavLink to={'/cards'}>Cards</NavLink>
        </div>
    );
};

export default Nav;
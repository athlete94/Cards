import React from 'react';
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <div className={'nav'}>

            <NavLink to={'/packs'}>Packs</NavLink>
            <NavLink to={PATH.LOGIN}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
            <NavLink to={PATH.PROFILE}>Profile</NavLink>
            <NavLink to={PATH.RECOVERY_PASSWORD}>Recovery password</NavLink>
        </div>
    );
};

export default Nav;
import React from 'react';
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <div className={'nav'}>
            <NavLink to={'/'}>Profile</NavLink>
            <NavLink to={'/registration'}>Registration</NavLink>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/test'}>Test</NavLink>
            <NavLink to={'/new-password'}>New password</NavLink>
            <NavLink to={'/recovery-password'}>Recovery password</NavLink>
        </div>
    );
};

export default Nav;
import React from 'react';
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <div className={'nav'}>
            <NavLink to={'/'}>Login</NavLink>
            <NavLink to={'/registration'}>Registration</NavLink>
            <NavLink to={'/profile'}>Profile</NavLink>
            <NavLink to={'/test'}>Test</NavLink>
            <NavLink to={'/recovery-password'}>Recovery password</NavLink>
            <NavLink to={'/packs'}>Packs</NavLink>
        </div>
    );
};

export default Nav;
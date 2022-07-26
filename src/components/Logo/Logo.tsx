import React from 'react';
import style from './Logo.module.css';
import Logo from '../../asets/svg/logo.svg';

export const Logotip = () => {
    return (
        <div className={style.logoContainer}>
            <img className={style.img} src={Logo} alt='Logo'/>
            <div className={style.text}>Learn Card</div>
        </div>
    );
};


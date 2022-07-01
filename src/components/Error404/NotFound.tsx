import React from 'react';
import Error404 from "../../asets/svg/Error404.svg";
import style from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={style.notfound}>
                <img  src={Error404} alt="SVG logo image"/>
        </div>
    );
};

export default NotFound;
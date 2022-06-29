import React from 'react';
import {useAppSelector} from "../../redux/store";
import mailSent from "../../asets/svg/mailSent.svg";
import style from './SendMessage.module.css'

const SendMessage = () => {

    const enteredEmail = useAppSelector((state) => state.recoveryPassword.enteredEmail)

    return (
        <div className={style.projectBlock}>
            <div className={style.container}>
                <h3>It-incubator</h3>
                <div className={style.img}>
                    <img src={mailSent} alt="SVG logo image"/>
                </div>
                <h3>Check Email</h3>
                <div className={style.text}>
                    We've sent an Email with instructions to
                </div>
                {enteredEmail}
            </div>
        </div>
    );
};

export default SendMessage;
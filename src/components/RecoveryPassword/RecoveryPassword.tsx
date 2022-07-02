import { useFormik } from 'formik';
import React from 'react';
import style from './RecoveryPassword.module.css'
import {Button,  FormControl, FormGroup, TextField} from "@material-ui/core";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {PATH} from "../../App";
import {Navigate, useNavigate} from "react-router-dom";
import {recoveryPasswordTC} from "../../redux/recoveryPasswordReducer";


type FormikErrorType = {
    email?: string
    error: string
}

const RecoveryPassword = () => {

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const error = useAppSelector((state)=> state.recoveryPassword.error)
    const enteredEmail = useAppSelector((state) => state.recoveryPassword.enteredEmail)
    const from = "test-front-admin <antoni.novik@yandex.ru>"
    const message = `<div style="background-color: #eeff00; padding: 15px">
              password recovery link:
              <a href='http://localhost:3000/#${PATH.NEW_PASSWORD}/$token$'>link</a>
              </div>`;

    const formik = useFormik({
        initialValues: {
            email: "",
            error: "",
        },
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {}
            if (!values.email) {
                errors.email = "Required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            return errors;
        },
        onSubmit: (values) => {
           const email = values.email
           const data = {email, message, from}
           dispatch(recoveryPasswordTC(data));
            console.log(values)
        },
    });

    if (enteredEmail) {
        return <Navigate to={PATH.SEND_MESSAGE}/>;
    }

    return (
        <div className={style.projectBlock}>
            <div className={style.container}>
                <h3>It-incubator</h3>
                <h3>Forgot your password?</h3>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <div className={style.text}>
                                Enter your email address and we will send you further instructions
                            </div>
                            <TextField
                                type="email"
                                label="Email"
                                margin="normal"
                                variant="standard"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: "red", fontStyle:"10px" }}>{formik.errors.email}</div>
                            ) : null}

                            <Button size={'small'}
                                    type={"submit"}
                                    variant={"contained"}
                                    color={"inherit"}
                                    disabled={!(formik.isValid && formik.dirty)}
                                    sx={{marginTop: '15px'}}>
                                Send instructions
                            </Button>

                            <div className={style.text}>
                                Did you remember you password?
                            </div>

                            <div className={style.buttonLink}>
                                <Button variant="text" size="small" onClick={() => navigate(PATH.LOGIN)}>Back to login</Button>
                            </div>

                            <div className={style.textOR}>OR</div>

                            <div className={style.buttonLink}>
                                <Button variant="text" size="small" onClick={() => navigate(PATH.REGISTRATION)}>Create New Account</Button>
                            </div>

                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>
    );
};


export default RecoveryPassword;


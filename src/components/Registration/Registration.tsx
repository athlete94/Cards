import { useFormik } from 'formik';
import React from 'react';
import style from './Registration.module.css'
import {Button,  FormControl, FormGroup, TextField} from "@material-ui/core";
import { useTypedDispatch} from "../../redux/store";
import {PATH} from "../../App";
import {useNavigate} from "react-router-dom";
import {registerTC} from "../../redux/registrationReducer";

export type FormRegistrationType = {
    email:string,
    password:string,
    confirmPassword?:string
}

const Registration = () => {

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 8) {
                errors.password = "Must be 8 characters or less";
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Enter the password again'
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'The passwords entered in both fields must match.'
            }
            return errors;
        },
        onSubmit: (values) => {
            debugger
            dispatch(registerTC(values));
        },
    });

    return (
        <div className={style.projectBlock}>
            <div className={style.container}>
                <h3>It-incubator</h3>
                <h3>Sign Up</h3>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
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

                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: "red" }}>{formik.errors.password}</div>
                            ) : null}

                            <TextField
                                id="confirm-password-input"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                {...formik.getFieldProps("confirmPassword")}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
                            ) : null}
                            <Button size={'small'} type={"submit"}
                                    variant={"contained"} color={"inherit"}
                                    sx={{
                                        marginTop: '15px',
                                    }}>
                                Sign up
                            </Button>
                            <div className={style.haveAccountContainer}>
                                <p>Have an account?</p>
                                <Button variant="text" size="small" onClick={() => navigate(PATH.LOGIN)}>Log in</Button>
                            </div>
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>
    );
};


export default Registration;


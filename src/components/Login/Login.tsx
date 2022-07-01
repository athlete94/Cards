import { useFormik } from 'formik';
import React from 'react';
import style from './Login.module.css'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField} from "@material-ui/core";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {loginTC} from "../../redux/authReducer";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../App";

export type FormLoginType = {
    email:string,
    password:string,
    rememberMe:boolean,
}

const Login = () => {

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const isLogin = useAppSelector(state=>state.login.isLogin)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
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
            return errors;
        },
        onSubmit: (values) => {
        dispatch(loginTC(values));
             formik.resetForm();
        },
    });

    if(isLogin){
        return <Navigate to={PATH.PROFILE}/>
    }


    return (
        <div className={style.projectBlock}>
            <div className={style.container}>
                <h3>It-incubator</h3>
                <h3>Sign in</h3>
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
                            <FormControlLabel
                                label={"Remember me"}
                                control={<Checkbox  {...formik.getFieldProps("rememberMe")} />}
                            />

                            <button className={style.linkRecovery} onClick={()=>navigate(PATH.RECOVERY_PASSWORD)}>Forgot password</button>

                            <Button size={'small'}
                                    type={"submit"}
                                    variant={"contained"}
                                    color={"inherit"}
                                    disabled={!(formik.isValid && formik.dirty)}>
                                Login
                            </Button>
                            <div className={style.textForRegistration}>Don't have an account?</div>
                            <button className={style.linkRegistration} onClick={()=>navigate(PATH.REGISTRATION)}>Sing Up</button>
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>
    );
};

export default Login;
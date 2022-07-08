import { useFormik } from 'formik';
import React, {useState} from 'react';
import style from './Registration.module.css'
import {useTypedDispatch} from "../../redux/store";
import {PATH} from "../../App";
import {useNavigate} from "react-router-dom";
import {registerTC} from "../../redux/registrationReducer";
//mui imports
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {FormControl} from "@material-ui/core";

export type FormRegistrationType = {
    email:string,
    password:string,
    confirmPassword?:string
}

export type StatePasswordStatusType = {
    password: string
    showPassword: boolean
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
            const errors: Partial<FormRegistrationType> = {} as Partial<FormRegistrationType>;
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
                errors.confirmPassword = 'Enter the password again';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'The passwords entered in both fields must match.';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(registerTC(values));
        },
    });

    const [value, setValue] = useState<StatePasswordStatusType>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValue({
            ...value,
            showPassword: !value.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };



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
                                autoComplete="current-password"
                                variant="standard"
                                type={value.showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps("password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}>
                                                {value.showPassword ?<Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: "red" }}>{formik.errors.password}</div>
                            ) : null}

                            <TextField
                                id="confirm-password-input"
                                label="Confirm Password"
                                autoComplete="current-password"
                                variant="standard"
                                type={value.showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps("confirmPassword")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}>
                                                {value.showPassword ?<Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <div style={{ color: "red" ,width: "200px", height: '50px'}}>
                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
                            </div>
                            <Button size={'small'}
                                    type={"submit"}
                                    variant={"contained"}
                                    color={"inherit"}
                                    disabled={!(formik.isValid && formik.dirty)}
                                    sx={{marginTop: '15px'}}>
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


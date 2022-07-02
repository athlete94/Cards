import { useFormik } from 'formik';
import React, {useState} from 'react';
import style from './NewPassword.module.css'
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {Navigate, useParams} from "react-router-dom";
import {setNewPasswordTC} from "../../redux/newPasswordReducer";
import { PATH } from '../../App';
import {StatePasswordStatusType} from "../Registration/Registration";
//mui imports
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {FormControl} from "@material-ui/core";


type FormNewPasswordType = {
    password:string,
    confirmPassword?:string
}

const NewPassword = () => {

    const dispatch = useTypedDispatch()

    const success = useAppSelector(state => state.newPassword.success)
    const {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: (values) => {
            const errors: Partial<FormNewPasswordType> = {} as Partial<FormNewPasswordType>;
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
            dispatch(setNewPasswordTC({password: values.password, resetPasswordToken: token}))
            formik.resetForm();
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

    if (success) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={style.projectBlock}>
            <div className={style.container}>
                <h3>It-incubator</h3>
                <h3>Create new password</h3>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
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
                            <Button size={'small'} type={"submit"}
                                    variant={"contained"} color={"inherit"}
                                    sx={{marginTop: '15px'}}
                                    disabled={!(formik.isValid && formik.dirty)}>
                                Create new password
                            </Button>
                            <div>
                                {token}
                            </div>
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;
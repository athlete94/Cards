import { useFormik } from 'formik';
import React from 'react';
import style from './NewPassword.module.css'
import {Button,  FormControl, FormGroup, TextField} from "@material-ui/core";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {Navigate, useParams} from "react-router-dom";
import {setNewPasswordTC} from "../../redux/newPasswordReducer";
import { PATH } from '../../App';


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
                            <div style={{ color: "red" ,width: "200px", height: '50px'}}>
                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
                            </div>
                            <Button size={'small'} type={"submit"}
                                    variant={"contained"} color={"inherit"}
                                    sx={{marginTop: '15px'}}>
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
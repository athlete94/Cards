import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {setErrorAC} from "../../redux/registrationReducer";

export const handleAppRequestError = (error: Error | AxiosError, dispatch: Dispatch) => {
    let errorMessage = axios.isAxiosError(error)
        ? (error.response?.data as { error: string }).error
        : error.message + ', more details in the console';

    console.log('Error: ', errorMessage);
    dispatch(setErrorAC(errorMessage));
};
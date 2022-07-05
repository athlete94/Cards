import React, {useEffect} from 'react';
import './App.css';
import { Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import NotFound from "./components/Error404/NotFound";
import Profile from "./components/Profile/Profile";
import Nav from "./components/Nav";
import Registration from "./components/Registration/Registration";
import {ErrorSnackbar} from "./utils/Error/ErrorSnackbar";
import RecoveryPassword from './components/RecoveryPassword/RecoveryPassword';
import SendMessage from "./components/SendMessage/SendMessage";
import {authMe} from "./redux/authReducer";
import {useAppSelector, useTypedDispatch} from "./redux/store";
import {LinearProgress} from "@material-ui/core";
import NewPassword from "./components/NewPassword/NewPassword";
import {CardsList} from "./components/CardsList/CardsList";

import Packs from "./components/Packs/Packs";


export const PATH = {
    LOGIN: '/login',
    NEW_PASSWORD: '/new-password',
    PROFILE: '/',
    RECOVERY_PASSWORD: '/recovery-password',
    SEND_MESSAGE:'/send-message',
    REGISTRATION: '/registration',
    TEST: '/test',
    ERROR: "*",
    CARDS: '/cards',
    PACKS:'/packs',
}


function App() {

    const dispatch = useTypedDispatch()
    let initialized = useAppSelector(state=>state.login.initialized)
    let status = useAppSelector((state)=>state.login.status)

    useEffect(()=>{
         dispatch(authMe())
    },[])


    if(!initialized){
       return <LinearProgress/>
    }

    return (

            <div className="App">
                <ErrorSnackbar/>
                <Nav />
                {status === 'loading' && <LinearProgress/>}
                <div>
                    <Routes>
                        <Route path={PATH.LOGIN} element={<Login/>}/>
                        <Route path={PATH.NEW_PASSWORD + '/:token'} element={<NewPassword/>}/>
                        <Route path={PATH.ERROR} element={<NotFound/>}/>
                        <Route path={PATH.PROFILE} element={<Profile/>}/>
                        <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
                        <Route path={PATH.SEND_MESSAGE} element={<SendMessage/>}/>
                        <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                        <Route path={PATH.CARDS} element={<CardsList/>}/>
                        <Route path={PATH.PACKS} element={<Packs/>}/>
                    </Routes>
                </div>
            </div>

    );
}

export default App;

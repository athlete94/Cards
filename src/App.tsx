import React from 'react';
import './App.css';
import { HashRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Test from "./components/Test";
import Nav from "./components/Nav";
import Registration from "./components/Registration/Registration";
import {ErrorSnackbar} from "./utils/Error/ErrorSnackbar";
import RecoveryPassword from './components/RecoveryPassword/RecoveryPassword';
import SendMessage from "./components/SendMessage/SendMessage";
import NewPassword from './components/NewPassword/NewPassword';


export const PATH = {
    LOGIN: '/login',
    NEW_PASSWORD: '/new-password',
    PROFILE: '/',
    RECOVERY_PASSWORD: '/recovery-password',
    SEND_MESSAGE:'/send-message',
    REGISTRATION: '/registration',
    TEST: '/test',
    ERROR: "*"
}


function App() {

    return (
        <HashRouter >
            <div className="App">
                <ErrorSnackbar/>
                <Nav />
                <div>
                    <Routes>
                        <Route path={PATH.LOGIN} element={<Login/>}/>
                        <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                        <Route path={PATH.ERROR} element={<NotFound/>}/>
                        <Route path={PATH.PROFILE} element={<Profile/>}/>
                        <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
                        <Route path={PATH.SEND_MESSAGE} element={<SendMessage/>}/>
                        <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                        <Route path={PATH.TEST} element={<Test/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>

    );
}

export default App;

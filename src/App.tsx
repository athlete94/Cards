import React from 'react';
import './App.css';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import NewPassword from "./components/NewPassword";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile/Profile";
import RecoveryPassword from "./components/RecoveryPassword";
import Registration from "./components/Registration";
import Test from "./components/Test";
import Nav from "./components/Nav";


export const PATH = {
    LOGIN: '/login',
    NEW_PASSWORD: '/new-password',
    PROFILE: '/',
    RECOVERY_PASSWORD: '/recovery-password',
    REGISTRATION: '/registration',
    TEST: '/test',
    ERROR: "*"
}


function App() {

    return (
        <HashRouter >
            <div className="App">
                <Nav />
                <div>
                    <Routes>
                        <Route path={PATH.LOGIN} element={<Login/>}/>
                        <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                        <Route path={PATH.ERROR} element={<NotFound/>}/>
                        <Route path={PATH.PROFILE} element={<Profile/>}/>
                        <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
                        <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                        <Route path={PATH.TEST} element={<Test/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>

    );
}

export default App;

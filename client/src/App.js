

import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { faHome, faBook, faFileContract, faHardHat, faFileSignature, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import './App.css';
import { isLoggedIn } from './reducers/auth';
import SideMenuBar from './components/SideMenu/sideMenu';
import TopMenuBar from './components/SideMenu/topMenu';
import Analyse from './components/Analyse/analyse.component';
import Login from './components/Login/login.component';
import Facturiers from './components/Facturier/Facturier.component';
import Profile from './components/Profile/profile.component';
import AllData from './components/AllData/allData.component';
import RedirectionPage from './components/redirectPage';
import DataUserClient from './components/dataUserClient.component';
import Contact from './components//sendMail.component';
import FAQ from './components/FAQ/faq.component';
import Aide from './components/FAQ/aide.component';
import PrivateRoute from './services/PrivateRoute';

import jwt_decode from 'jwt-decode';
import {Toast } from 'primereact/toast';

const App = () => {
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const user =localStorage.getItem('role')
    const toast = useRef(null);
    const menu = [
        { label: "Mes données", to: "/userData", icon: faBook, isVisible: user === 'user' ? true : false},
        { label: "Contact", to: "/contact", icon: faHome, isVisible: user === 'user' ? true : false},
        { label: "FAQ", to: "/faq", icon: faHome, isVisible: user === 'user' ? true : false},
        {label : 'Base de données', to : '/allData', icon: faFileContract, isVisible : user === 'admin' || user === 'moderator' ? true : false},
        { label: "Analyse", to: "/analyse", icon: faHome, isVisible: user === 'admin' || user === 'moderator' ? true : false},
        { label: "Facturiers", to: "/facturiers", icon: faFileSignature, isVisible: user === 'admin' || user === 'moderator' ? true : false},
        {label : 'Aide', to : '/aide', icon: faCircleQuestion , isVisible : user === 'admin' || user === 'moderator' ? true : false},
        {label : 'Profil', to : '/profile', icon: faHardHat, isVisible : true, isLast: true},

    ];
    const onToggleMenu = () => {
        setMenuIsVisible(!menuIsVisible);
    }
    const forcedCloseMenu = () => {
        setMenuIsVisible(false)
    }
    const checkTimeSession = () => {
        const token = localStorage.getItem('access_token')
        const decoded = jwt_decode(token);
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const expInSeconds = decoded.exp;
        const remainingTimeInSeconds = expInSeconds - nowInSeconds;
        const remainingHours = Math.floor(remainingTimeInSeconds / 3600);
        const remainingMinutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
        const remainingSeconds = remainingTimeInSeconds % 60;
        const remainingTime = `${remainingHours}h${remainingMinutes}m${remainingSeconds}s`;
        toast.current.show({ severity: 'success', summary: 'Il vous reste', detail: remainingTime, life: 3000 });
        if (remainingTimeInSeconds < 300) {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Temps de session bientôt expiré !', life: 3000 });
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: remainingTime, life: 3000 });
        }
        if (remainingTimeInSeconds < 0) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('role')
            window.location.reload();
        }
    }
    setInterval(checkTimeSession, 600000);

    if (isLoggedIn()) {  
        console.log(user)  
        return (
        <Router>
            <div className="main-window">
                {/* Checker le temps restant de connexion toutes les minutes, si le temps est bientot fini, afficher un message */}
                <Toast ref={toast} />
                <TopMenuBar onToggleMenu={onToggleMenu}></TopMenuBar>
                <div className='main-section'>
                    <div className={`side-menu ${menuIsVisible ? "menu-is-visible" : "menu-is-hidden"}`}>
                    <SideMenuBar menu={menu} setMenuVisible={forcedCloseMenu}></SideMenuBar>
                    </div>
                    <div className={`main-content ${menuIsVisible ? "" : "menu-is-hidden-content"}`}>
                        <Switch>
                            <PrivateRoute path='/profile' exact component={Profile} />
                            <PrivateRoute path='/analyse' exact component={Analyse} roles={['admin', 'moderator']}/>
                            <PrivateRoute path='/allData' exact component={AllData} roles={['admin', 'moderator']}/>
                            <PrivateRoute path='/facturiers' exact component={Facturiers} roles={['admin', 'moderator']}/>
                            <PrivateRoute path='/userData' exact component={DataUserClient} roles={['user']}/>
                            <PrivateRoute path='/contact' exact component={Contact} />
                            <PrivateRoute path='/FAQ' exact component={FAQ} roles = {['user']}/>
                            <PrivateRoute path='/aide' exact component={Aide} roles = {['admin', 'moderator']}/>
                            <PrivateRoute path="/login" exact component={Login} />
                            <PrivateRoute path='/contact' exact component={Analyse} />
                            <PrivateRoute path='/redirect' exact component={RedirectionPage}/>
                            <Route>
                                <Redirect to="/redirect" exact component={RedirectionPage} />
                            </Route>
                        </Switch>
                    </div> 
                </div>
            </div>
        </Router>);
    } else {
        return (
            <Router>
                <Switch>
                    <Route path='/login' exact component={Login} />
                    <Route>
                        <Redirect to="/login" exact component={Login} />
                    </Route>
                </Switch>
            </Router>);
    }
}

export default App;
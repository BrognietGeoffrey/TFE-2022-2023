

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, NavLink } from 'react-router-dom';
import { faTools, faUsers,faAddressBook, faCalendar,faHome, faBook, faFileContract, faHardHat, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import './App.css';
import { isLoggedIn } from './reducers/auth';
import SideMenuBar from './components/SideMenu/sideMenu';
import TopMenuBar from './components/SideMenu/topMenu';
import Analyse from './components/Analyse/analyse.component';
import Login from './components/Login/login.component';
import Facturiers from './components/Facturier/Facturier.component';
import Profile from './components/profile.component';
import RedirectionPage from './components/redirectPage';
import PrivateRoute from './services/PrivateRoute';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {Toast } from 'primereact/toast';


const App = () => {

    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const user =localStorage.getItem('role')

    const menu = [
        { label: "Mes données", to: "/userData", icon: faBook, isVisible: user === 'user' ? true : false},

        
        {label : 'Factures', to : '/factures', icon: faFileContract, isVisible : user === 'admin' || user === 'moderator' ? true : false},
        { label: "Analyse", to: "/analyse", icon: faHome, isVisible: user === 'admin' || user === 'moderator' ? true : false},
        { label: "Clients", to: "/clients", icon: faAddressBook, isVisible: user === 'admin' || user === 'moderator' ? true : false},
        { label: "Facturiers", to: "/facturiers", icon: faFileSignature, isVisible: user === 'admin' || user === 'moderator' ? true : false},
        { label: "Utilisateurs", to: "/utilisateurs", icon: faUsers, isVisible: user === 'admin' || user === 'moderator' ? true : false},
        {label : 'Profil', to : '/profile', icon: faHardHat, isVisible : true, isLast: true},

    ];


    const onToggleMenu = () => {
        setMenuIsVisible(!menuIsVisible);
    }
    const forcedCloseMenu = () => {
        setMenuIsVisible(false)
    }




    if (isLoggedIn()) {    
        // si l'utilisateur connecté est un user, il est redirigé vers la page de profil
       
  

        return (<Router>
            <div className="main-window">
                {/* Checker le temps restant de connexion toutes les minutes, si le temps est bientot fini, afficher un message */}
              



                

                <TopMenuBar onToggleMenu={onToggleMenu}></TopMenuBar>

                <div className='main-section'>
                    {/* Quand le temps de connexion est bientot fini, afficher un message  */}
                     

                    <div className={`side-menu ${menuIsVisible ? "menu-is-visible" : "menu-is-hidden"}`}>
                    <SideMenuBar menu={menu} setMenuVisible={forcedCloseMenu}></SideMenuBar>
                    </div>
                    
                    <div className={`main-content ${menuIsVisible ? "" : "menu-is-hidden-content"}`}>
     
                        <Switch>

                            <PrivateRoute path='/profile' exact component={Profile} />

                            <PrivateRoute path='/analyse' exact component={Analyse} roles={['admin', 'moderator']}/>
                            <PrivateRoute path='/factures' exact component={Analyse} roles={['admin', 'moderator']}/>
                            <PrivateRoute path='/clients' exact component={Analyse} roles={['admin', 'moderator']}/>
                            <PrivateRoute path='/facturiers' exact component={Facturiers} roles={['admin', 'moderator']}/>
                            <PrivateRoute path='/utilisateurs' exact component={Analyse} roles={['admin', 'moderator']}/>
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


import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, NavLink } from 'react-router-dom';
import { faTools, faUsers,faAddressBook, faCalendar,faHome, faBook, faFileContract, faHardHat, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import './App.css';
import { isLoggedIn } from './reducers/auth';


import Home from './components/Analyse/Analyse';
import Login from './components/Login/login.component';


const App = () => {

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const menu = [
      
    ];


    const onToggleMenu = () => {
        setMenuIsVisible(!menuIsVisible);
    }
    const forcedCloseMenu = () => {
        setMenuIsVisible(false)
    }

    if (isLoggedIn()) {
        console.log(localStorage.getItem('role'))
        console.log(localStorage.getItem('access_token'))

        let role = localStorage.getItem('role')
        if(role === 'admin'){
            menu.pop()
        }
        return (<Router>
            <div className="main-window">


                <div className='main-section'>
                    <div className={`side-menu ${menuIsVisible ? "menu-is-visible" : "menu-is-hidden"}`}>
                    </div>
                    
                    <div className={`main-content ${menuIsVisible ? "" : "menu-is-hidden-content"}`}>
                    <Switch>
                        <Route path='/analyse' exact component={Home} />
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
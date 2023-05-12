/* Code provenant du TFE de Madame Jaujatte Ikram. Un grand merci à elle de m'avair laissé utilisé son code ! */

import React from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import './topMenu.css';
const TopMenuBar = ({onToggleMenu}) => {

    const logOut = () => {
        localStorage.removeItem('access_token');
        Dexie.delete('MyDatabase');
        window.location.reload();
    }

    return (
        <div className="top-menu-bar">

            <button type="button" className="menu-burger" onClick={onToggleMenu}>
                <i className="pi pi-bars" />
            </button>

            <Link className="menu-sign-out" to="#" onClick={logOut}>
                <i className="pi pi-sign-out" />
            </Link>

        </div>
    );
}

export default TopMenuBar
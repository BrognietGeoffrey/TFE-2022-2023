/* Code provenant du TFE de Madame Jaujatte Ikram. Un grand merci à elle de m'avair laissé utilisé son code ! */

import './sideMenu.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideMenuBar = ({menu, setMenuVisible}) => {

    return (
        <div className='menu-card'>
            {menu.map(item => {
                return (
                    <>
                    {item.isLast? 
                    <hr className='menu-bottom'>
                    </hr>: 
                    <span></span>}
                    <Link
                        
                        aria-label={item.label}
                        role="menuitem"
                        className={item.isVisible? 'router-link' : 'router-link empty-side-link'}
                        activeClassName="router-link-active"
                        to={item.to}
                        onClick={setMenuVisible}
                        exact
                    >
                        <FontAwesomeIcon className='icon' icon={item.icon} />
                        <span>{item.label}</span>
                    </Link>
                    </>
                )
            })}
        </div>
    );
}

export default SideMenuBar
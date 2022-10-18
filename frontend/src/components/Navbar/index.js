import React from 'react';
// import navbar.css
import './navbar.css'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './Navbar';
;


const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
            <img src="../../logojv10.png" alt="logo" />
            
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/addHabitant' activeStyle>
            Ajouter un habitant
          </NavLink>
          <NavLink to='/addFacture' activeStyle>
            Ajouter une facture
          </NavLink>
          <NavLink to='/vosDroits' activeStyle>
            Vos droits
          </NavLink>
          <NavLink to='/comptes' activeStyle>
            Comptes clients/fournisseurs
          </NavLink>
          <NavLink to='/facture' activeStyle>
            Facturier
          </NavLink>
         
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Se connecter</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
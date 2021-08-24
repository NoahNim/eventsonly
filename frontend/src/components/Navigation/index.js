import React from 'react';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      // <ProfileButton user={sessionUser} />
      <nav className="navbar-container navbar-container-loggedin"><button onClick={logout}>Log Out</button></nav>
        
    );
  } else {
    sessionLinks = (
      <nav className="navbar-container navbar-container-loggedout">
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    );
  }

  return (
    <ul>
      <li>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
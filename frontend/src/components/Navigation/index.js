import React from 'react';
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
      <nav className="navbar-container navbar-container-loggedin">
        <div className="nav-events"><NavLink to="/events"><img alt="logo" src="https://prject-omega-events.s3.us-west-2.amazonaws.com/EventsSmall.png" width="50"></img></NavLink></div>
        <button className="logout-button" onClick={logout}>Log Out</button>
      </nav>
        
    );
  } else {
    sessionLinks = (
      <div>
      <nav className="navbar-container navbar-container-loggedout">
          <div className="nav-events"><NavLink to="/events"><img alt="logo" src="https://prject-omega-events.s3.us-west-2.amazonaws.com/EventsSmall.png" width="50"></img></NavLink></div>
        <div className="nav-login"><LoginFormModal /></div>
          <NavLink to="/signup" className="nav-signup">Sign Up</NavLink>
        </nav>
      </div>
    );
  }

  return (
    <nav className="navbar-root">
        {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
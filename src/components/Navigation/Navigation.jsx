import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logoutIcon from '../../images/logout-icon-white.png';
import './Navigation.css';

function Navigation({ isLoggedIn, onLoginClick, onLogoutClick, currentUser }) {
  const location = useLocation();
  const isSavedNews = location.pathname === '/saved-news';

  const linkClass = ({ isActive }) =>
    `navigation__link${isActive ? ' navigation__link--active' : ''}`;

  return (
    <nav className="navigation">
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink to="/saved-news" className={linkClass}>
          Saved articles
        </NavLink>
      )}

      {isLoggedIn ? (
        <button className="navigation__button-loggedin" onClick={onLogoutClick}>
          {currentUser?.name || 'User'}
          <img
            src={logoutIcon}
            alt="Log out"
            className="navigation__logout-icon"
          />
        </button>
      ) : (
        <button className="navigation__button" onClick={onLoginClick}>
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;

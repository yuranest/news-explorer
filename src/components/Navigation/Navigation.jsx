import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logoutIcon from '../../images/logout-icon-white.png';
import './Navigation.css';

function Navigation({ isLoggedIn, onLoginClick, onLogoutClick, currentUser }) {
  const location = useLocation();

  return (
    <nav className="navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `navigation__link${
            isActive ? ' navigation__link--active navigation__link--home' : ''
          }`
        }
      >
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to="/saved-news"
          className={({ isActive }) =>
            `navigation__link${
              isActive
                ? ' navigation__link--active navigation__link--saved'
                : ''
            }`
          }
        >
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

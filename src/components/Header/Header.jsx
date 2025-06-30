import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import closeIcon from '../../images/close-icon.png';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Header.css';

function Header({ isLoggedIn, onLoginClick, onLogoutClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const currentUser = useContext(CurrentUserContext);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className={`header ${!isHomePage ? 'header_light' : ''}`}>
      <div className={`header__top ${!isHomePage ? 'header__top_white' : ''}`}>
        <div className="header__container">
          <h1 className="header__logo">NewsExplorer</h1>

          <div className="header__burger" onClick={toggleMobileMenu}>
            <span className="burger__icon" />
          </div>

          <div className="header__desktop-nav">
            <Navigation
              isLoggedIn={isLoggedIn}
              onLoginClick={onLoginClick}
              onLogoutClick={onLogoutClick}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="header__mobile-menu">
          <button
            className="header__close-button"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ backgroundImage: `url(${closeIcon})` }}
            aria-label="Close"
          />
          <Navigation
            isLoggedIn={isLoggedIn}
            onLoginClick={onLoginClick}
            onLogoutClick={onLogoutClick}
            currentUser={currentUser}
          />
        </div>
      )}

      {isHomePage && (
        <div className="header__content">
          <h2 className="header__title">
            What’s going on in
            <br /> the world?
          </h2>
          <p className="header__subtitle">
            Find the latest news on any topic and save them in your personal
            <br />
            account.
          </p>
          <SearchForm />
        </div>
      )}
    </header>
  );
}

export default Header;

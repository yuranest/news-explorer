import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import BurgerButton from '../BurgerButton/BurgerButton';
import './Header.css';

function Header({ isLoggedIn, onLoginClick, onLogoutClick, onSearch }) {
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
          <div className="header__desktop-nav">
            <Navigation
              isLoggedIn={isLoggedIn}
              onLoginClick={() => {
                setIsMobileMenuOpen(false);
                onLoginClick();
              }}
              onLogoutClick={onLogoutClick}
              currentUser={currentUser}
            />
          </div>
          <BurgerButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            isDark={!isHomePage}
          />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="header__mobile-menu">
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
          <div className="header__content-wrapper">
            <div>
              <h2 className="header__title">What’s going on in the world?</h2>
            </div>
            <p className="header__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
            <SearchForm onSearch={onSearch} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

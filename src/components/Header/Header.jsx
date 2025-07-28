import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import BurgerButton from '../BurgerButton/BurgerButton';
import './Header.css';

function Header({
  isLoggedIn,
  onLoginClick,
  onLogoutClick,
  onSearch,
  isModalOpen,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const block = isMobileMenuOpen || isModalOpen;
    document.body.style.overflow = block ? 'hidden' : '';
  }, [isMobileMenuOpen, isModalOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

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
          {!isModalOpen && (
            <BurgerButton
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              isDark={!isHomePage}
            />
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="burger-menu-overlay">
          <div className="burger-menu">
            <div className="burger-menu__top">
              <h1 className="burger-menu__logo">NewsExplorer</h1>
              <button
                className="burger-menu__close"
                onClick={toggleMobileMenu}
              />
            </div>
            <nav className="burger-menu__nav">
              <NavLink
                to="/"
                className="burger-menu__link"
                onClick={toggleMobileMenu}
              >
                Home
              </NavLink>
              <button
                className="burger-menu__signin"
                onClick={() => {
                  toggleMobileMenu();
                  onLoginClick();
                }}
              >
                Sign in
              </button>
            </nav>
          </div>
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

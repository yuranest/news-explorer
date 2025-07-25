import React from 'react';
import burgerLight from '../../images/burger_light.svg';
import burgerDark from '../../images/burger_dark.svg';
import closeIcon from '../../images/close-icon.png';
import './BurgerButton.css';

function BurgerButton({ isOpen, onClick, isDark }) {
  const burgerIcon = isDark ? burgerDark : burgerLight;

  return (
    <button
      className="burger-button"
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      type="button"
    >
      <img
        src={isOpen ? closeIcon : burgerIcon}
        alt={isOpen ? 'Close' : 'Menu'}
        className="burger-button__icon"
      />
    </button>
  );
}

export default BurgerButton;

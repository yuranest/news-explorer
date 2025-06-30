import React from 'react';
import './ModalWithForm.css';
import closeIcon from '../../images/close-icon.png';

export default function ModalWithForm({
  title,
  name,
  children,
  buttonText,
  onClose,
  onSubmit,
  isOpen,
  isFormValid,
  footerText,
  onFooterClick,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__container">
        <button className="modal__close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form
          className="modal__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`modal__submit ${
              !isFormValid ? 'modal__submit_disabled' : ''
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
          {footerText && (
            <p className="modal__footer">
              or{' '}
              <span className="modal__link" onClick={onFooterClick}>
                {footerText}
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

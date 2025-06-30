import React from 'react';
import './SuccessModal.css';
import closeIcon from '../../images/close-icon.png';

export default function SuccessModal({ isOpen, onClose, onSwitchToLogin }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_type_success">
      <div className="modal__container">
        <button
          className="modal__close-button"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <h2 className="modal__title modal__title_type_success">
          Registration successfully completed!
        </h2>
        <p className="modal__footer modal__footer_type_success">
          <span className="modal__link_success" onClick={onSwitchToLogin}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

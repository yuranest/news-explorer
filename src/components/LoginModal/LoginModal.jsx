import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <ModalWithForm
      title="Sign in"
      name="login"
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
      footerText="Sign up"
      onFooterClick={onSwitchToRegister}
    >
      <>
        <label className="modal__label">Email</label>
        <input
          type="email"
          name="email"
          className="modal__input"
          value={values.email || ''}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
        <span className="modal__error">{errors.email}</span>

        <label className="modal__label">Password</label>
        <input
          type="password"
          name="password"
          className="modal__input"
          value={values.password || ''}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
        <span className="modal__error">{errors.password}</span>
      </>
    </ModalWithForm>
  );
}

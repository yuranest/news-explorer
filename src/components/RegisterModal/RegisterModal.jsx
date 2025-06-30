import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const [serverError, setServerError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await onRegister({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      setServerError('');
    } catch (err) {
      if (err.status === 409) {
        setServerError('This email is not available');
      } else {
        setServerError('Something went wrong');
      }
    }
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
      footerText="Sign in"
      onFooterClick={onSwitchToLogin}
    >
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

      <label className="modal__label">Username</label>
      <input
        type="text"
        name="name"
        className="modal__input"
        value={values.name || ''}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="30"
        placeholder="Enter your username"
      />
      <span className="modal__error">{errors.name}</span>

      {serverError && (
        <span className="modal__error modal__error_server">{serverError}</span>
      )}
    </ModalWithForm>
  );
}

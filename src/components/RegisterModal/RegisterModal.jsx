import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
    });
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
      footerText="or Sign in"
      onFooterClick={onSwitchToLogin}
    >
      <label className="modal__field">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>
      <label className="modal__field">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          value={values.password || ''}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <label className="modal__field">
        Username
        <input
          type="text"
          name="name"
          className="modal__input"
          value={values.name || ''}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>
    </ModalWithForm>
  );
}

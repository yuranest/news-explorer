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
      footerText="or Sign up"
      onFooterClick={onSwitchToRegister}
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
    </ModalWithForm>
  );
}

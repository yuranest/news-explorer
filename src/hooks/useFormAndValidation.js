import { useState, useCallback } from 'react';

export default function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const { name, value, type, validity } = target;

    let message = '';

    if (validity.valueMissing) {
      message = 'This field is required';
    } else if (type === 'email' && !validity.valid) {
      message = 'Invalid email address';
    } else if (validity.tooShort) {
      message = `Must be at least ${target.minLength} characters`;
    } else if (validity.tooLong) {
      message = `Must be no more than ${target.maxLength} characters`;
    } else if (validity.patternMismatch) {
      message = 'Invalid format';
    }

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: message }));
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, errors, isValid, resetForm };
}

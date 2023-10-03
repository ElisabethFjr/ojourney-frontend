import { useState, ChangeEvent } from 'react';
import DOMPurify from 'dompurify';

import './InputFieldEdit.scss';

export interface InputFieldProps {
  name: string;
  placeholder: string;
  label: string;
  type: string;
  icon: string;
  required?: boolean;
  autocomplete?: string;
  maxlength?: number;
  value: string;
}

function InputFieldEdit({
  name,
  placeholder,
  label,
  type,
  icon,
  required,
  autocomplete,
  maxlength,
  value,
}: InputFieldProps) {
  const [sanitizedValue, setSanitizedValue] = useState('');
  const isValueChange = () => {
    if (sanitizedValue.length === 0) {
      return true;
    }
    return false;
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizer = DOMPurify.sanitize(event.target.value);
    setSanitizedValue(sanitizer);
  };

  return (
    <div className="field-edit">
      <label className="field-edit-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="field-edit-input"
        value={!isValueChange ? value : sanitizedValue}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete={autocomplete}
        id={name}
        type={type}
        maxLength={maxlength}
      />
      <div className="field-edit-icon">
        <i className={icon} />
      </div>
    </div>
  );
}

export default InputFieldEdit;

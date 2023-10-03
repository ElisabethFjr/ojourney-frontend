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
}: InputFieldProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setValue(sanitizedValue);
  };

  return (
    <div className="field-edit">
      <label className="field-edit-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="field-edit-input"
        value={value}
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

import { useState, ChangeEvent } from 'react';
import DOMPurify from 'dompurify';

import './InputField.scss';

export interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  icon: string;
  required?: boolean;
}

function InputField({
  name,
  icon,
  placeholder,
  type,
  required,
}: InputFieldProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setValue(sanitizedValue);
  };

  return (
    <div className="field">
      <div className="field-container">
        <i className={icon} />
        <input
          className="field-input"
          value={value}
          onChange={handleChange}
          name={name}
          required={required}
          id={name}
          type={type}
        />
        <label className="field-label" htmlFor={name}>
          {placeholder}
        </label>
      </div>
    </div>
  );
}

export default InputField;

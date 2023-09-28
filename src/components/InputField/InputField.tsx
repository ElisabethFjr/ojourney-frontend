import { useState, ChangeEvent } from 'react';
import DOMPurify from 'dompurify';

import './InputField.scss';

export interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  icon: string;
  required?: boolean;
  autocomplete?: string;
}

function InputField({
  name,
  icon,
  placeholder,
  type,
  required,
  autocomplete,
}: InputFieldProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setValue(sanitizedValue);
  };

  return (
    <div className="field">
      <input
        className="field-input"
        value={value}
        onChange={handleChange}
        name={name}
        required={required}
        autoComplete={autocomplete}
        id={name}
        type={type}
        placeholder=" "
      />
      <label className="field-label" htmlFor={name}>
        {placeholder}
      </label>
      <div className="field-icon">
        <i className={icon} />
      </div>
    </div>
  );
}

export default InputField;

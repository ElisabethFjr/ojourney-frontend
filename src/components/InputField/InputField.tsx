import { useState, ChangeEvent } from 'react';
import DOMPurify from 'dompurify';

import './InputField.scss';

interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  icon: string;
}

function InputField({ name, icon, placeholder, type }: InputFieldProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setValue(sanitizedValue);
  };

  return (
    <div className="field">
      <label className="field-label visually-hidden" htmlFor={name}>
        {placeholder}
      </label>
      <div className="field-container">
        <i className={icon} />
        <input
          className="field-input"
          value={value}
          onChange={handleChange}
          name={name}
          placeholder={placeholder}
          id={name}
          type={type}
        />
      </div>
    </div>
  );
}

export default InputField;

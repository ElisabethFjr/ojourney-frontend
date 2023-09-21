import React, { useState, ChangeEvent } from 'react';
import './TextareaField.scss';

interface TextareaFieldProps {
  name: string;
  placeholder: string;
}

function TextareaField({ name, placeholder }: TextareaFieldProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="field">
      <label className="field-label visually-hidden" htmlFor={name}>
        {placeholder}
      </label>
      <textarea
        className="field-textarea"
        value={value}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        id={name}
      />
    </div>
  );
}

export default TextareaField;

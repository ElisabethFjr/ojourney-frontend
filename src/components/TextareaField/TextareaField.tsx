import React, { useState, ChangeEvent } from 'react';
import './TextareaField.scss';

interface TextareaFieldProps {
  name: string;
  placeholder: string;
  icon: string;
}

function TextareaField({ name, placeholder, icon }: TextareaFieldProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="field">
      <label className="field-label visually-hidden" htmlFor={name}>
        {placeholder}
      </label>
      <div className="field-container icon-textarea">
        <i className={icon} />
        <textarea
          className="field-textarea"
          value={value}
          onChange={handleChange}
          name={name}
          placeholder={placeholder}
          id={name}
        />
      </div>
    </div>
  );
}

export default TextareaField;

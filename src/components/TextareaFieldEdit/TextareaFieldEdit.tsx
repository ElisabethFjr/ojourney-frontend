import React, { useState, ChangeEvent } from 'react';
import './TextareaFieldEdit.scss';

export interface TextareaFieldProps {
  name: string;
  placeholder: string;
  label: string;
  icon: string;
  required?: boolean;
  autocomplete?: string;
  maxlength?: number;
}

function TextareaFieldEdit({
  name,
  placeholder,
  label,
  icon,
  required,
  autocomplete,
  maxlength,
}: TextareaFieldProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="field-edit">
      <label className="field-edit-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="field-edit-textarea"
        value={value}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete={autocomplete}
        id={name}
        maxLength={maxlength}
      />
      <div className="field-edit-textarea-icon">
        <i className={icon} />
      </div>
    </div>
  );
}

export default TextareaFieldEdit;

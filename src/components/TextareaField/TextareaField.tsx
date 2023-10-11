import { useState, ChangeEvent } from 'react';
import './TextareaField.scss';

export interface TextareaFieldProps {
  name: string;
  placeholder: string;
  icon: string;
  required?: boolean;
  autocomplete?: string;
  maxlength?: number;
}

function TextareaField({
  name,
  placeholder,
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
    <div className="field">
      <div className="field-container">
        <textarea
          className="field-textarea"
          value={value}
          onChange={handleChange}
          name={name}
          required={required}
          autoComplete={autocomplete}
          id={name}
          placeholder=" "
          maxLength={maxlength}
        />
        <label className="field-textarea-label" htmlFor={name}>
          {placeholder}
        </label>
        <div className="field-textarea-icon">
          <i className={icon} />
        </div>
      </div>
    </div>
  );
}

export default TextareaField;

import { useState, ChangeEvent } from 'react';

export interface TextareaFieldProps {
  name: string;
  placeholder: string;
  label: string;
  icon: string;
  required?: boolean;
  autocomplete?: string;
  maxlength?: number;
  ariaLabel?: string;
}

function TextareaField({
  name,
  label,
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
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="field-textarea"
        value={value}
        onChange={handleChange}
        name={name}
        required={required}
        autoComplete={autocomplete}
        id={name}
        placeholder={placeholder}
        maxLength={maxlength}
      />
      <div className="field-textarea-icon">
        <i className={icon} />
      </div>
    </div>
  );
}

export default TextareaField;

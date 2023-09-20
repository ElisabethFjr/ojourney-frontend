import { useState, ChangeEvent } from 'react';
import './FieldForm.scss';

interface FieldFormProps {
  name: string;
  placeholder: string;
  type: string;
}

function FieldForm({ name, placeholder, type }: FieldFormProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="field">
      <label className="field-label visually-hidden" htmlFor={name}>
        {placeholder}
      </label>
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
  );
}

export default FieldForm;

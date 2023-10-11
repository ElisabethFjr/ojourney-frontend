//  Import React Hooks & ChangeEvent
import { useState, ChangeEvent } from 'react';
// Import Dompurify
import DOMPurify from 'dompurify';
// Import Redux Hooks
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
// Import Redux Actions
import { getSuggestions, resetSuggestions } from '../../store/reducers/trip';
// Import Style
import './InputField.scss';

export interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  icon: string;
  required?: boolean;
  autocomplete?: string;
  maxlength?: number;
}

function InputField({
  name,
  icon,
  placeholder,
  type,
  required,
  autocomplete,
  maxlength,
}: InputFieldProps) {
  // Access the Redux dispatch function using the 'useAppDispatch' hook.
  const dispatch = useAppDispatch();
  // State Variable
  const [value, setValue] = useState('');
  const [previousValueLength, setpreviousValueLength] = useState(0);

  const suggestions = useAppSelector((state) => state.trip.suggestions);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'localisation') {
      if (previousValueLength < event.target.value.length) {
        setpreviousValueLength(previousValueLength + 1);
        const obj = { value: event.target.value };
        dispatch(getSuggestions(obj));
      } else if (
        previousValueLength > event.target.value.length &&
        previousValueLength !== 0
      ) {
        setpreviousValueLength(previousValueLength - 1);
        dispatch(resetSuggestions());
      }
    }
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setValue(sanitizedValue);
  };

  const handleClickSugg = (newValue: string) => {
    setValue(newValue);
    dispatch(resetSuggestions());
  };
  const handleBlur = () => {
    dispatch(resetSuggestions());
  };

  const allSuggestions = suggestions.map((sugg) => {
    const random = Math.floor(Math.random() * 15000);
    return (
      <div
        role="button"
        className="field-input"
        tabIndex={0}
        onKeyDown={() => handleClickSugg(`${sugg.line1} ${sugg.line2}`)}
        key={random}
        onClick={() => handleClickSugg(`${sugg.line1} ${sugg.line2}`)}
        onBlur={handleBlur}
      >
        {sugg.line1} {sugg.line2}
      </div>
    );
  });

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
        maxLength={maxlength}
      />
      <label className="field-label" htmlFor={name}>
        {placeholder}
      </label>
      {suggestions && suggestions.length > 1 && name === 'localisation' ? (
        allSuggestions
      ) : (
        <p />
      )}
      <div className="field-icon">
        <i className={icon} />
      </div>
    </div>
  );
}

export default InputField;

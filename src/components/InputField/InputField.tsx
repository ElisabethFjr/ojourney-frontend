import { useState, ChangeEvent } from 'react';
import DOMPurify from 'dompurify';

import './InputField.scss';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setSuggestions, resetSuggestions } from '../../store/reducers/trip';

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
  // Initialize Hooks
  const dispatch = useAppDispatch();

  // Declaration state variables
  const [value, setValue] = useState(''); // Input value
  const [previousValueLength, setpreviousValueLength] = useState(0); // State for the previous input value (for suggestions localisation)

  // Fetch states from Redux store
  const suggestions = useAppSelector((state) => state.trip.suggestions);

  // EVENT HANDLER to handle changes in the input component
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // If specific input "localisation", set the auto suggestions from the geoapify API
    if (event.target.name === 'localisation') {
      const inputValueLength = event.target.value.length;
      // If the input value increase (user is adding some characters on the input)
      if (previousValueLength < inputValueLength) {
        setpreviousValueLength(inputValueLength);
        const searchValue = event.target.value;
        // Dispatch the action to display suggestions based on the current input value
        dispatch(setSuggestions({ value: searchValue }));
        // Else, if the input value decrease (user is deleting some characters on the input)
      } else if (
        previousValueLength > inputValueLength &&
        inputValueLength !== 0
      ) {
        setpreviousValueLength(inputValueLength);
        // Dispatch the action to clear all suggestions
        dispatch(resetSuggestions());
      }
    }
    // Sanitize the input value using DOMPurify to prevent security vulnerabilities
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setValue(sanitizedValue);
  };

  // EVENT HANDLER on the click on a suggested localisation
  const handleClickSuggestion = (newValue: string) => {
    setValue(newValue);
    dispatch(resetSuggestions());
  };

  // EVENT HANDLER when an input element loses focus
  const handleBlur = () => {
    dispatch(resetSuggestions());
  };

  // Create a list of localisation suggestion depending on the input value
  const allSuggestions = suggestions.map((suggestion) => {
    // Generate a random key item
    const randomKeyItem = Math.floor(Math.random() * 15000);
    return (
      <div
        role="button"
        className="field-input-suggestion-item"
        tabIndex={0}
        onKeyDown={() =>
          handleClickSuggestion(`${suggestion.line1} ${suggestion.line2}`)
        }
        key={randomKeyItem}
        onClick={() =>
          handleClickSuggestion(`${suggestion.line1} ${suggestion.line2}`)
        }
        onBlur={handleBlur}
      >
        {/* Localisation suggestion composed of 'line1' and 'line2' elements from the API */}
        {/* Details localisation : address_line1 for the adress and address_line2 for the country) */}
        {suggestion.line1} {suggestion.line2}
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
      {/* Display localisations suggestion list if it exists and if input name = localisation */}
      {suggestions && suggestions.length > 1 && name === 'localisation' ? (
        <div className="field-input-suggestion-list">{allSuggestions}</div>
      ) : null}
      <div className="field-icon">
        <i className={icon} />
      </div>
    </div>
  );
}

export default InputField;

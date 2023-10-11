//  Import React Hooks & ChangeEvent
import { useState, ChangeEvent } from 'react';
// Import Dompurify
import DOMPurify from 'dompurify';
// Import Nanoid
import { nanoid } from 'nanoid';
// Import Redux Hooks
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
// Import Redux Actions
import { resetSuggestions } from '../../store/reducers/trip';
// Import utils
import handleSuggestionLocalisation from '../../utils/handleLocalisation';
// Import Styles
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
  // Declaration State Variables
  const [value, setValue] = useState('');
  const [previousValueLength, setpreviousValueLength] = useState(0); // State for the previous input value (for suggestions localisation)

  // Fetch states from Redux store
  const suggestions = useAppSelector((state) => state.trip.suggestions);

  // EVENT HANDLER to handle changes in the input component
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // If specific input "localisation", set the auto suggestions from the geoapify API
    // Check /utils/handleLocalisation to see the function
    handleSuggestionLocalisation(
      event,
      dispatch,
      previousValueLength,
      setpreviousValueLength
    );
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
    // Generate a random key item with nanoid
    const uniqueKey = nanoid();
    return (
      <div
        role="button"
        className="field-input-suggestion-item"
        tabIndex={0}
        onKeyDown={() =>
          handleClickSuggestion(`${suggestion.line1} ${suggestion.line2}`)
        }
        key={uniqueKey}
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

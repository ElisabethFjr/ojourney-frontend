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
  handleSuggestionSelected?: (selected: boolean) => void;
}

function InputField({
  name,
  icon,
  placeholder,
  type,
  required,
  autocomplete,
  maxlength,
  handleSuggestionSelected,
}: InputFieldProps) {
  // Initializing Hooks
  const dispatch = useAppDispatch();

  // Declaration State Variables
  const [value, setValue] = useState('');

  // Fetch states from Redux store
  const suggestions = useAppSelector((state) => state.trip.suggestions);

  // EVENT HANDLER to handle changes in the input component
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // If specific input "localisation", set the auto suggestions from the geoapify API with a debounce
    // Check /utils/handleLocalisation to see the function
    handleSuggestionLocalisation(event, dispatch);
    // Sanitize the input value using DOMPurify to prevent security vulnerabilities
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    // If empty input, set the handleSuggestionSelected at false
    if (sanitizedValue === '') {
      if (handleSuggestionSelected) {
        handleSuggestionSelected(false);
      }
    }
    // Update the input value with the sanitized value
    setValue(sanitizedValue);
  };

  // EVENT HANDLER on the click on a suggested localisation
  const handleClickSuggestion = (newValue: string) => {
    setValue(newValue);
    if (handleSuggestionSelected) {
      handleSuggestionSelected(true);
    }
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
        aria-label={`${suggestion.line1} ${suggestion.line2}`}
      >
        {/* Localisation suggestion composed of 'line1' and 'line2' elements from the API */}
        {/* Details localisation : address_line1 for the address and address_line2 for the country) */}
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

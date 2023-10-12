import { ChangeEvent } from 'react';
import { AppDispatch } from '../store';
import { setSuggestions } from '../store/reducers/trip';

// Function to handle suggestions auto-complete for the "localisation" input
const handleSuggestionLocalisation = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: AppDispatch
) => {
  // If input "localisation"
  if (event.target.name === 'localisation') {
    // Clear any existing timeout if it exists
    if (handleSuggestionLocalisation.timeoutId) {
      clearTimeout(handleSuggestionLocalisation.timeoutId);
    }
    // Set a timeout to delay the API call by 600 milliseconds (avoid mutliple call api at every value change)
    handleSuggestionLocalisation.timeoutId = setTimeout(() => {
      // Dispatch the setSuggestions action with the input value to fetch suggestions
      dispatch(setSuggestions({ value: event.target.value }));
    }, 600);
  }
};

// Initialize the timeoutId to 0, no timeout running
handleSuggestionLocalisation.timeoutId = 0;

export default handleSuggestionLocalisation;

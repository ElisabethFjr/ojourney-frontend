import { ChangeEvent } from 'react';
import { AppDispatch } from '../store';
import { setSuggestions, resetSuggestions } from '../store/reducers/trip';

const handleSuggestionLocalisation = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: AppDispatch,
  previousValueLength: number,
  setPreviousValueLength: React.Dispatch<React.SetStateAction<number>>
) => {
  if (event.target.name === 'localisation') {
    const inputValueLength = event.target.value.length;
    setPreviousValueLength(inputValueLength);
    const searchValue = event.target.value;
    if (inputValueLength > previousValueLength) {
      dispatch(setSuggestions({ value: searchValue }));
    } else if (
      inputValueLength < previousValueLength &&
      inputValueLength !== 0
    ) {
      dispatch(resetSuggestions());
    }
  }
};

export default handleSuggestionLocalisation;

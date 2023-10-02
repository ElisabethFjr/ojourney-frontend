import { createAction, createReducer } from '@reduxjs/toolkit';

interface ShowFlashMessageState {
  message: string | null;
  isSuccess: boolean | null;
  isVisible: false,
}

export const initialState: ShowFlashMessageState = {
  message: null,
  isSuccess: true,
  isVisible: true,
};

export const showFlashMessage = createAction<{ message: string; isSuccess: boolean }>('flashMessage/show');
export const resetFlashMessage = createAction('flashMessage/reset');

const flashMessageReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(showFlashMessage, (state, action) => {
    state.message = action.payload.message || '';
    state.isSuccess = action.payload.isSuccess || true;
    state.isVisible = true; 
  })
  .addCase(resetFlashMessage, (state) => {
    state.message = null;
    state.isVisible = false;
  })
});

export default flashMessageReducer;
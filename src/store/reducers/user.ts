// Imports
import { createReducer } from '@reduxjs/toolkit';
// Import axios
import axiosInstance from '../../utils/axios';

interface UserState {
  pseudo: string | null;
  isLoading: boolean;
}

// User Reducer initial states
export const initialState: UserState = {
  pseudo: null,
  isLoading: false,
};

// Create Actions

// Create User Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login promise pending
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    // Login promise success
    .addCase(login.fulfilled, (state, action) => {
      state.pseudo = action.payload.pseudo;
      state.isLoading = false;
    })
    // Login promise rejetected
    .addCase(login.rejected, (state) => {
      state.isLoading = false;
    })
    // Logout
    .addCase(logout, (state) => {
      state.pseudo = null; // Reset pseudo to null after logout
      delete axiosInstance.defaults.headers.common.Authorization; // Delete the JWT from instance Axios Instance headers
    });
});

export default userReducer;

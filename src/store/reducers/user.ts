// Imports
import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

// Import axios
import axiosInstance from '../../utils/axios';

// Type user states
interface UserState {
  pseudo: string | null;
  errorMessage: string | null ;
}

// User Reducer initial states
export const initialState: UserState = {
  pseudo: null,
  errorMessage : null
};

// Create Actions

// Logout action
export const logout = createAction('/logout');

// Login action
export const login = createAsyncThunk('/login', async (formData: FormData) => {
// Convert formData
  const objData = Object.fromEntries(formData);
// Send a POST request to the /login endpoint with the user's data
  const { data } = await axiosInstance.post('/login', objData);
// Set the JWT token received from the server to the default axios headers
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
// Remove the token from the data object to avoid storing it in redux
  delete data.token;

  return data as {
    pseudo: string;
  };
});

// Create User Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login promise pending
    .addCase(login.pending, (state) => {
      state.errorMessage = null; 
    }) 
    // Login primise rejected
    .addCase(login.rejected, (state, action) => {
      state.errorMessage = action.error.message; // Store the error message
    })
    // Login promise success
    .addCase(login.fulfilled, (state, action) => {
      state.pseudo = action.payload.pseudo; // Store the user's pseudo
      state.errorMessage = null;
    })
    // Logout
    .addCase(logout, (state) => {
      state.pseudo = null; // Reset pseudo to null after logout
      delete axiosInstance.defaults.headers.common.Authorization; // Delete the JWT from instance Axios Instance headers
    });
});

export default userReducer;

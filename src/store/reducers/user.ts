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

// Create Logout action
export const logout = createAction('/signOut');

// Create async Login action
export const login = createAsyncThunk('/login', async (formData: FormData) => {
// Convert formData
  const objData = Object.fromEntries(formData);
// POST user data to login endpoint
  const { data } = await axiosInstance.post('/signIn', objData);
// Set JWT token in axios headers
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
// For security do not store the token in redux 
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
      state.errorMessage = action.error.message ?? null; // Store the error message
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

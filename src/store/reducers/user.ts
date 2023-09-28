import axios from 'axios';

// Imports
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

// Import axios
import axiosInstance from '../../utils/axios';

// Import types
import { Trip } from '../../@types';

// Type user states
interface UserState {
  data: {
    id: number | null;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    password: string | null;
    trips: Trip[] | null;
  };
  isConnected: boolean;
  errorMessage: string | null;
  flashMessage: string | null;
}

// User Reducer initial states
export const initialState: UserState = {
  data: {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    trips: null,
  },
  isConnected: false,
  errorMessage: null,
  flashMessage: null,
};

// Create Logout action
export const logout = createAction('user/logout');

// Create async Login action
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    try {
      // Convert formData
      const objData = Object.fromEntries(formData);
      // POST user data to login endpoint
      const { data } = await axiosInstance.post('/signIn', objData);
      // Set JWT token in axios headers
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      // For security do not store the token in redux
      localStorage.setItem('token', JSON.stringify(data.token));
      delete data.token;

      return data;
    } catch (error) {
      // Check if the error is an Axios error Type and has a response
      if (axios.isAxiosError(error) && error.response) {
        // Throw an error with the server's error message
        throw new Error(error.response.data.error);
      } else {
        // If it's not an Axios error or doesn't have a response, throw a generic error
        throw new Error('UNKNOWN_ERROR');
      }
    }
  }
);

// Create User Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login promise pending
    .addCase(login.pending, (state) => {
      state.errorMessage = null;
    })
    // Login promise rejected
    .addCase(login.rejected, (state, action) => {
      state.errorMessage = action.error.message || 'UNKNOWN_ERROR';
      console.log('Promise rejected');
    })
    // Login promise success
    .addCase(login.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.isConnected = true;
      state.errorMessage = null;
      // localStorage.setItem('token', action.payload.token); // Store the token in localStorage
      console.log('Promise succeed');
    })
    // Logout
    .addCase(logout, (state) => {
      state.data = initialState.data; // Reset user data to initial state
      state.isConnected = false;
      delete axiosInstance.defaults.headers.common.Authorization; // Delete the JWT from instance Axios Instance headers
      localStorage.removeItem('token'); // Store the token in localStorage
    });
});

export default userReducer;

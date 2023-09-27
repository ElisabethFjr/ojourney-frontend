// Imports
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

// Import axios
import axiosInstance from '../../utils/axios';

// Définir le type pour error
interface Error {
  message: string;
}

// Type user states
interface UserState {
  data: {
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    password: string | null;
  };
  isConnected: boolean;
  errorMessage: string | null;
  flashMessage: string | null;
}

// User Reducer initial states
export const initialState: UserState = {
  data: {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
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
      const { data } = await axiosInstance.post('/signIn', objData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // Set JWT token in axios headers
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      // For security do not store the token in redux
      delete data.token;

      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error);
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
      console.log('Promise succeed');
    })
    // Logout
    .addCase(logout, (state) => {
      state.data = initialState.data; // Reset user data to initial state
      state.isConnected = false;
      delete axiosInstance.defaults.headers.common.Authorization; // Delete the JWT from instance Axios Instance headers
    });
});

export default userReducer;

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
import { Proposition, Trip } from '../../@types';

// Type user states
interface UserState {
  data: {
    id: number | null;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    password: string | null;
    trips: Trip[] | null;
    links: Proposition[] | null;
    consent_newsletter: boolean | false;
    consent_commercial: boolean | false;
  };
  isConnected: boolean;
  checkedPassword: boolean;
  toastSuccess: boolean;
  errorMessage: string | null;
  env: string | null;
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
    links: null,
    consent_commercial: false,
    consent_newsletter: false,
  },
  isConnected: false,
  toastSuccess: false,
  checkedPassword: false,
  errorMessage: null,
  env: null,
};

// Variables axiosOptions (dev/prod => token/cookies)
const env = null;
let axiosOptions = {};
if (env === 'dev') {
  axiosOptions = {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem('token')?.replace(/"|_/g, '') || ''
      }`,
    },
  };
} else {
  axiosOptions = {
    withCredentials: true,
  };
}

// Create async Login action
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    try {
      // Convert formData to an JSON object
      const objData = Object.fromEntries(formData);
      // Send a POST request to login user
      const { data } = await axiosInstance.post(
        '/signIn',
        objData,
        axiosOptions
      );
      if (env === 'dev') {
        localStorage.setItem('token', data.token);
        delete data.token;
      }
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

// Create Logout action
export const logout = createAction('user/logout');

// Create Logout action
// export const logout = createAsyncThunk('user/logout', async () => {
//   await axiosInstance.get('/logout');
// });

// Create action to ckeck user password
export const checkUserPassword = createAsyncThunk(
  'user/checkUserPassword',
  async ({ passwordData, id }: { passwordData: string; id: number | null }) => {
    // Send a DELETE request to delete user account
    const { data } = await axiosInstance.post(
      `/users/${id}`,
      passwordData,
      axiosOptions
    );
    return data;
  }
);

// Create action delete user account
export const deleteUserAccount = createAsyncThunk(
  'user/deleteAccount',
  async ({ id }: { id: number | null }) => {
    // Send a DELETE request to delete user account
    await axiosInstance.delete(`/users/${id}`, axiosOptions);
  }
);

// Create action update user data
export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async ({ formData, id }: { formData: FormData; id: number | null }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a POST request to update user data
    const { data } = await axiosInstance.patch(
      `/users/${id}`,
      objData,
      axiosOptions
    );
    return data;
  }
);
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async ({ formData, id }: { formData: FormData; id: number | null }) => {
    if (env === 'dev') {
      axiosOptions = {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      };
    } else {
      axiosOptions = {
        withCredentials: true,
      };
    }
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a POST request to update user data
    const { data } = await axiosInstance.patch(
      `/users/${id}`,
      objData,
      axiosOptions
    );
    return data;
  }
);

// Create User Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(login.pending, (state) => {
      state.errorMessage = null;
    })
    .addCase(login.rejected, (state, action) => {
      state.errorMessage = action.error.message || 'UNKNOWN_ERROR';
    })
    .addCase(login.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.isConnected = true;
      state.errorMessage = null;
    })
    // Logout
    .addCase(logout, (state) => {
      state.data = initialState.data; // Reset user data to initial state
      state.isConnected = false;
      if (localStorage.getItem('token') !== undefined) {
        localStorage.removeItem('token');
      }
      // FAIRE UN APPEL VERS LE BACKEND POUR SUPPRIMER LE COOKIE
    })
    // Check User Password
    .addCase(checkUserPassword.fulfilled, (state) => {
      state.checkedPassword = true;
    })
    .addCase(checkUserPassword.rejected, (state, action) => {
      state.errorMessage = action.error.message || 'UNKNOWN_ERROR';
      state.checkedPassword = false;
    })
    // Delete User Account
    .addCase(deleteUserAccount.fulfilled, (state) => {
      state.data = initialState.data; // Reset user data to initial state
      state.toastSuccess = true;
      state.isConnected = false;
      state.errorMessage = null;
    })
    .addCase(deleteUserAccount.rejected, (state, action) => {
      state.errorMessage = action.error.message || 'UNKNOWN_ERROR';
    })
    // Update user data
    .addCase(updateUserData.rejected, (state, action) => {
      state.errorMessage = action.error.message || 'UNKNOWN_ERROR';
    })
    .addCase(updateUserData.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.toastSuccess = true;
      state.errorMessage = null;
    })
    // Update Password
    .addCase(updatePassword.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.toastSuccess = true;
    });
});

export default userReducer;

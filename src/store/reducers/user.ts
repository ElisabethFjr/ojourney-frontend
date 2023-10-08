// Imports
import {
  createReducer,
  createAsyncThunk,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

// Import Toast
import { toast } from 'react-toastify';

// Imports Axios
import { AxiosError } from 'axios';
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
    trips: Trip[];
    links: Proposition[];
    consent_newsletter: boolean;
    consent_commercial: boolean;
  };
  trip: Trip | null;
  isConnected: boolean;
  checkedPassword: boolean;
  errorMessage: string | null;
}

// User Reducer initial states
export const initialState: UserState = {
  data: {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    trips: [],
    links: [],
    consent_commercial: false,
    consent_newsletter: false,
  },
  isConnected: false,
  checkedPassword: false,
  errorMessage: null,
  trip: null,
};

const env = 'dev';

// Create LOGIN action
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    try {
      // Convert formData to an JSON object
      const objData = Object.fromEntries(formData);
      // Send a POST request to login user
      const { data } = await axiosInstance.post('/signIn', objData);
      if (env === 'dev') {
        localStorage.setItem('token', data.token);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      }
      return data;
    } catch (error) {
      // Type error as an AxiosError to access specific axios properties (typescript)
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as { error: string })
        ?.error;
      // Throw an error with the server's error message if available
      throw new Error(errorMessage);
    }
  }
);

// Create LAGOUT action (local)
// export const logout = createAction('user/logout');

// Create LOGOUT action (deployed)
export const logout = createAsyncThunk('user/logout', async () => {
  await axiosInstance.get('/logout');
});

// Create action to FETCH user data
export const fetchUserInfos = createAsyncThunk(
  'user/fetchUserInfo',
  async (id: number | null) => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  }
);

// Create action to CHECK user password
export const checkUserPassword = createAsyncThunk(
  'user/checkUserPassword',
  async ({ formData, id }: { formData: FormData; id: number | null }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a DELETE request to delete user account
    const { data } = await axiosInstance.post(`/users/${id}`, objData);
    return data;
  }
);

// Create action to DELETE user account
export const deleteUserAccount = createAsyncThunk(
  'user/deleteAccount',
  async ({ id }: { id: number | null }) => {
    // Send a DELETE request to delete user account
    await axiosInstance.delete(`/users/${id}`);
  }
);

// Create action UPDATE user data
export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async ({ formData, id }: { formData: FormData; id: number | null }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a POST request to update user data
    const { data } = await axiosInstance.patch(`/users/${id}`, objData);
    return data;
  }
);

// Create action to UPDATE user password
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async ({ formData, id }: { formData: FormData; id: number | null }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a POST request to update user data
    const { data } = await axiosInstance.patch(`/users/${id}`, objData);
    return data;
  }
);

// Create action to UPDATE consents
export const updateConsent = createAsyncThunk(
  'user/updateConsent',
  async ({ formData, id }: { formData: FormData; id: number | null }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a PATCH request to update user data
    const data = await axiosInstance.patch(`/users/${id}`, objData);
    return data;
  }
);

// Create action to ADD a new trip
export const addTrip = createAsyncThunk(
  'user/addTrip',
  async (formData: FormData) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a DELETE request to delete user account
    const { data } = await axiosInstance.post(`/trips`, objData);
    return data;
  }
);

// Create action to DELETE a trip
export const deleteTrip = createAsyncThunk(
  'user/deleteTrip',
  async (id: number | null) => {
    const { data } = await axiosInstance.delete(`/trips/${id}`);
    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(login.rejected, (state, action) => {
      let errorMessage = '';
      switch (action.error.message) {
        case 'Wrong email or password !':
          errorMessage = 'Email ou mot de passe incorrect.';
          break;
        case 'Please confirm your email before signing in !':
          errorMessage =
            'Veuillez confirmer votre email avant de vous connecter.';
          break;
        default:
          errorMessage =
            action.error.message ||
            'Une erreur est survenue. Veuillez réessayer plus tard.';
          break;
      }
      state.errorMessage = errorMessage;
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
    .addCase(logout.fulfilled, (state) => {
      state.data = initialState.data; // Reset user data to initial state
      state.isConnected = false;
    })
    // Fetch User Data
    .addCase(fetchUserInfos.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    })
    // Update User Data
    .addCase(updateUserData.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      toast.success('Les informations ont bien été mises à jour !');
      state.errorMessage = null;
    })
    .addCase(updateUserData.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // Update Password
    .addCase(updatePassword.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      toast.success('Le mot de passe a bien été mis à jour !');
      state.errorMessage = null;
    })
    .addCase(updatePassword.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // Check User Password (to delete account)
    .addCase(checkUserPassword.fulfilled, (state, action) => {
      state.checkedPassword = action.payload.success === 'Correct password !';
      state.errorMessage = null;
    })
    .addCase(checkUserPassword.rejected, (state) => {
      state.checkedPassword = false;
      state.errorMessage = 'Le mot de passe est incorrect.';
    })
    // Delete User Account
    .addCase(deleteUserAccount.fulfilled, (state) => {
      // If correct password, delete the user account
      if (state.checkedPassword) {
        state.data = initialState.data; // Reset user data to initial state
        state.isConnected = false; // Disconnection
        toast.success('Votre compte a bien été supprimé.');
        state.errorMessage = null;
      }
    })
    .addCase(deleteUserAccount.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // Update Consents
    .addCase(updateConsent.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      toast.success('Les informations ont bien été mises à jour !');
      state.errorMessage = null;
    })
    .addCase(updateConsent.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })

    // Add Trip
    .addCase(addTrip.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      toast.success('Le voyage a bien été crée !');
      state.errorMessage = null;
    })
    .addCase(addTrip.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // Delete Trip
    .addCase(deleteTrip.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      toast.success('Le voyage a bien été supprimé !');
      state.errorMessage = null;
    })
    .addCase(deleteTrip.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    });
});

export default userReducer;

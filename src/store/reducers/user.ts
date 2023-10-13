// Imports
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

// Import from Modules
import { toast } from 'react-toastify';

// Imports Axios Instance
import { AxiosError } from 'axios';
import axiosInstance from '../../utils/axios';

// Import Interface Types
import { Proposition, Trip } from '../../@types';

// Type user states
interface UserState {
  data: {
    id: string | null;
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
  isAuth: boolean;
  isLoading: boolean;
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
  isAuth: false,
  isLoading: false,
  checkedPassword: false,
  errorMessage: null,
  trip: null,
};

const env = null;

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
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        localStorage.setItem('userToken', data.token);
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

// Create LOGOUT action
export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('userToken');
  await axiosInstance.get('/logout');
});

// Create action to FETCH user data
export const fetchUserInfos = createAsyncThunk(
  'user/fetchUserInfo',
  async (id: string | null) => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  }
);

// Create action to CHECK user data with token
export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async () => {
    if (env === 'dev') {
      const token = localStorage.getItem('userToken');
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      axiosInstance.defaults.withCredentials = true;
    }
    const { data } = await axiosInstance.get('/user');
    if (data.token) {
      localStorage.removeItem('userToken');
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      localStorage.setItem('userToken', data.token);
    }
    return data;
  }
);

// Create action to CHECK user password
export const checkUserPassword = createAsyncThunk(
  'user/checkUserPassword',
  async ({ formData, id }: { formData: FormData; id: string | null }) => {
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
  async ({ id }: { id: string | null }) => {
    // Send a DELETE request to delete user account
    await axiosInstance.delete(`/users/${id}`);
  }
);

// Create action UPDATE user data
export const updateUserProfil = createAsyncThunk(
  'user/updateUserProfil',
  async ({ formData, id }: { formData: FormData; id: string | null }) => {
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
  async ({ formData, id }: { formData: FormData; id: string | null }) => {
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
  async ({ formData, id }: { formData: FormData; id: string | null }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a PATCH request to update user data
    const { data } = await axiosInstance.patch(`/users/${id}`, objData);
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
    const { data } = await axiosInstance.post(`/trips`, objData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }
);

// Create action to DELETE a trip
export const deleteTrip = createAsyncThunk(
  'user/deleteTrip',
  async (tripId: string | null) => {
    const { data } = await axiosInstance.delete(`/trips/${tripId}`);
    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.isAuth = true;
      state.errorMessage = null;
      state.isLoading = false;
    })
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
      state.isLoading = false;
    })
    // Logout
    .addCase(logout.fulfilled, (state) => {
      state.data = initialState.data; // Reset user data to initial state
      toast.success('Vous avez été déconnecté avec succès.');
      state.isAuth = false;
    })
    .addCase(logout.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // Fetch User Data
    .addCase(fetchUserInfos.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchUserInfos.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.isLoading = false;
    })
    .addCase(fetchUserInfos.rejected, (state) => {
      state.isLoading = false;
    })
    // Check User Data Token
    .addCase(checkUserAuth.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(checkUserAuth.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.isAuth = true;
      state.isLoading = false;
    })
    .addCase(checkUserAuth.rejected, (state) => {
      state.isAuth = false;
      state.isLoading = false;
    })
    // Update User Data
    .addCase(updateUserProfil.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateUserProfil.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };

      toast.success('Les informations ont bien été mises à jour !');
      state.errorMessage = null;
      state.isLoading = false;
    })
    .addCase(updateUserProfil.rejected, (state) => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
      state.isLoading = false;
    })
    // Update Password
    .addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updatePassword.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      toast.success('Le mot de passe a bien été mis à jour !');
      state.errorMessage = null;
      state.isLoading = false;
    })
    .addCase(updatePassword.rejected, (state) => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
      state.isLoading = false;
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
    .addCase(deleteUserAccount.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteUserAccount.fulfilled, (state) => {
      // If correct password, delete the user account
      if (state.checkedPassword) {
        state.data = initialState.data; // Reset user data to initial state
        state.isAuth = false; // Disconnection
        toast.success('Votre compte a bien été supprimé.');
        state.errorMessage = null;
        state.isLoading = false;
      }
    })
    .addCase(deleteUserAccount.rejected, (state) => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
      state.isLoading = false;
    })
    // Update Consents
    .addCase(updateConsent.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateConsent.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      toast.success('Les informations ont bien été mises à jour !');
      state.errorMessage = null;
      state.isLoading = false;
    })
    .addCase(updateConsent.rejected, (state) => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
      state.isLoading = false;
    })
    // Add Trip
    .addCase(addTrip.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addTrip.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      toast.success('Le voyage a bien été crée !');
      state.errorMessage = null;
      state.isLoading = false;
    })
    .addCase(addTrip.rejected, (state) => {
      state.isLoading = false;
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

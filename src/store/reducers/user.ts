// Imports
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

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

// Create LOGIN action
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    try {
      // Convert formData to an JSON object
      const objData = Object.fromEntries(formData);
      // Send a POST request to login user
      const { data } = await axiosInstance.post('/signIn', objData);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      localStorage.setItem('userToken', data.token);
      return data;
    } catch (error) {
      // Type error as an AxiosError to access specific axios properties (TypeScript)
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const responseData =
          (axiosError.response.data as { error: string }) || {};
        const errorMessage = responseData.error;
        if (axiosError.response.status === 400) {
          throw new Error('E-mail ou mot de passe incorrect.');
        } else if (
          errorMessage === 'Please confirm your e-mail before signing in !'
        ) {
          throw new Error(
            'Veuillez confirmer votre e-mail avant de vous connecter.'
          );
        }
      }
      // If no specific error was handled, throw a general error
      throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
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
    const token = localStorage.getItem('userToken');
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { data } = await axiosInstance.get('/user');
    // If the response data contains a token
    if (data.token) {
      // Remove the existing user token from local storage
      localStorage.removeItem('userToken');
      // Reset and set the new token in local storage
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      localStorage.setItem('userToken', data.token);
    }
    // Else return data
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

// Create action to LEAVE a trip (members of a trip)
export const leaveTrip = createAsyncThunk(
  'user/leaveTrip',
  async ({
    tripId,
    memberId,
  }: {
    tripId: string | null;
    memberId: string | null;
  }) => {
    const { data } = await axiosInstance.delete(
      `/trips/${tripId}/members/${memberId}`
    );
    return data;
  }
);

// Create action to reset auth status after invite trip
export const resetAuth = createAction('user/resetAuth');

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
      if (action.error) {
        errorMessage =
          action.error.message ||
          'Une erreur est survenue. Veuillez réessayer plus tard.';
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
    .addCase(addTrip.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
      if (action.error) {
        const errorResponse = action.error;
        if (
          errorResponse.message ===
          'Only .jpg, .jpeg, .png and .gif files are allowed !'
        ) {
          state.errorMessage =
            'Type de fichier non pris en charge. Veuillez utiliser des fichiers .jpg, .jpeg, .png ou .gif.';
        } else if (errorResponse.message === 'File too large') {
          state.errorMessage = 'Le fichier est trop volumineux (2MB maximum).';
        }
      }
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
    })
    // Leave Trip
    .addCase(leaveTrip.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      toast.success('Vous avez quitté le voyage avec succès !');
    })
    .addCase(leaveTrip.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // Reset Auth
    .addCase(resetAuth, (state) => {
      state.isAuth = false;
    });
});

export default userReducer;

// Imports
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

// Import Toast
import { toast } from 'react-toastify';

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

// Create Login action
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a POST request to login user
    const { data } = await axiosInstance.post('/signIn', objData);
    if (env === 'dev') {
      localStorage.setItem('token', data.token);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    }
    return data;
  }
);

// Create Logout action
export const logout = createAction('user/logout');

// Create Logout action
// export const logout = createAsyncThunk('user/logout', async () => {
//   await axiosInstance.get('/logout');
// });

// Create action to fetch user data
export const fetchUserInfos = createAsyncThunk(
  'user/fetchUserInfo',
  async (id: number | null) => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  }
);

// Create action to ckeck user password
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
// Create action to delete user account
export const deleteUserAccount = createAsyncThunk(
  'user/deleteAccount',
  async ({ id }: { id: number | null }) => {
    // Send a DELETE request to delete user account
    await axiosInstance.delete(`/users/${id}`);
  }
);

// Create action update user data
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

// Create action to update user password
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

// Create action to update consents
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

// Create action to fetch trip infos
export const fetchTripData = createAsyncThunk(
  'trip/fetchTripData',
  async (id: number | null) => {
    const { data } = await axiosInstance.get(`/trips/${id}`);
    return data;
  }
);

// Create action to update a trip
export const updateTrip = createAsyncThunk(
  'trip/updateTrip',
  async ({ formData, id }: { formData: FormData; id: number | null }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    const { data } = await axiosInstance.patch(`/trips/${id}`, objData);
    return data;
  }
);

// Create action to delete a trip
export const deleteTrip = createAsyncThunk(
  'trip/deleteTrip',
  async (id: number | null) => {
    const { data } = await axiosInstance.delete(`/trips/${id}`);
    return data;
  }
);

// Create action to delete a proposition
export const deleteProposition = createAsyncThunk(
  'trip/deleteProposition',
  async ({
    id_trip,
    id_link,
  }: {
    id_trip: number | null;
    id_link: number | null;
  }) => {
    const { data } = await axiosInstance.delete(
      `/trips/${id_trip}/links/${id_link}`
    );
    return data;
  }
);

// Create action to update a proposition
export const updateProposition = createAsyncThunk(
  'trip/updateProposition',
  async ({
    formData,
    idTrip,
    idLink,
  }: {
    formData: FormData;
    idTrip: number | null;
    idLink: number | null;
  }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    const { data } = await axiosInstance.patch(
      `/trips/${idTrip}/links/${idLink}`,
      objData
    );
    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
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
    })
    // Fetch User Data
    .addCase(fetchUserInfos.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    })
    .addCase(fetchUserInfos.rejected, (state, action) => {
      state.errorMessage = action.error.message || 'UNKNOWN_ERROR';
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
    // Check User Password
    .addCase(checkUserPassword.fulfilled, (state) => {
      state.errorMessage = null;
      state.checkedPassword = true;
    })
    .addCase(checkUserPassword.rejected, (state) => {
      state.errorMessage =
        'Une erreur est survenue. Veuillez réessayer plus tard.';
      state.checkedPassword = false;
    })
    // Delete User Account
    .addCase(deleteUserAccount.fulfilled, (state) => {
      state.data = initialState.data; // Reset user data to initial state
      state.isConnected = false;
      toast.success('Votre compte a bien été supprimé.');
      state.errorMessage = null;
    })
    .addCase(deleteUserAccount.rejected, (state, action) => {
      state.errorMessage = action.error.message || 'UNKNOWN_ERROR';
    })
    // Update Consent
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
    // Fetch Trip Data
    .addCase(fetchTripData.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
    })
    .addCase(fetchTripData.rejected, (state) => {
      state.errorMessage =
        'Une erreur est survenue lors de la récupération du voyage.';
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
    // Update Proposition
    .addCase(updateProposition.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
      toast.success('La proposition a bien été modifée !');
      state.errorMessage = null;
    })
    .addCase(updateProposition.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // Delete Proposition
    .addCase(deleteProposition.fulfilled, (state, action) => {
      if (state.trip) {
        state.trip.links = state.trip.links.filter(
          (link) => link.id !== action.payload.id
        );
      }
      toast.success('La proposition a bien été supprimée !');
    })
    .addCase(deleteProposition.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    });
});

export default userReducer;

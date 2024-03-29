// Imports Redux Toolkit
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

// Import from Modules
import { toast } from 'react-toastify';

// Import Axios Instance
import axiosInstance from '../../utils/axios';

// Import Interface Types
import { Member, Proposition, Suggestion } from '../../@types';

// Type trip states
interface TripState {
  trip: {
    id: string | null;
    date_start: string | null;
    date_end: string | null;
    localisation: string;
    lat: number | null;
    lon: number | null;
    description: string;
    url_image: string;
    alt_image: string;
    user_id: string | null;
    members: Member[];
    links: Proposition[];
  };
  isLoading: boolean;
  errorMessage: string | null;
  suggestions: Suggestion[];
}

// Trip Reducer initial states
export const initialState: TripState = {
  trip: {
    id: null,
    date_start: null,
    date_end: null,
    localisation: '',
    lat: null,
    lon: null,
    description: '',
    url_image: '',
    alt_image: '',
    user_id: null,
    members: [],
    links: [],
  },
  isLoading: false,
  errorMessage: null,
  suggestions: [],
};

// Create action to FETCH trip infos
export const fetchTripData = createAsyncThunk(
  'trip/fetchTripData',
  async (tripId: string | null) => {
    const { data } = await axiosInstance.get(`/trips/${tripId}`);
    return data;
  }
);

// Create action to UPDATE a trip
export const updateTrip = createAsyncThunk(
  'trip/updateTrip',
  async ({
    formData,
    tripId,
  }: {
    formData: FormData;
    tripId: string | null;
  }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    const { data } = await axiosInstance.patch(`/trips/${tripId}`, objData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }
);

// Create action to ADD a new proposition
export const addProposition = createAsyncThunk(
  'user/addProposition',
  async ({
    formData,
    tripId,
  }: {
    formData: FormData;
    tripId: string | null;
  }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a DELETE request to delete user account
    const { data } = await axiosInstance.post(
      `/trips/${tripId}/links`,
      objData
    );
    return data;
  }
);

// Create action to UPDATE a proposition
export const updateProposition = createAsyncThunk(
  'trip/updateProposition',
  async ({
    formData,
    tripId,
    propositionId,
  }: {
    formData: FormData;
    tripId: string | null;
    propositionId: string | null;
  }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    const { data } = await axiosInstance.patch(
      `/trips/${tripId}/links/${propositionId}`,
      objData
    );
    return data;
  }
);

// Create action to DELETE a proposition
export const deleteProposition = createAsyncThunk(
  'trip/deleteProposition',
  async ({
    tripId,
    propositionId,
  }: {
    tripId: string | null;
    propositionId: string | null;
  }) => {
    const { data } = await axiosInstance.delete(
      `/trips/${tripId}/links/${propositionId}`
    );
    return data;
  }
);
// Create action to fetch member infos
export const informationMember = createAsyncThunk(
  'member/informationMember',
  async ({
    tripId,
    memberId,
  }: {
    tripId: string | null;
    memberId: string | null;
  }) => {
    const { data } = await axiosInstance.get(
      `/trips/${tripId}/members/${memberId}`
    );
    return data;
  }
);

// Create action to DELETE a member from a trip
export const deleteMember = createAsyncThunk(
  'member/deleteMember',
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

// Create action to TOGGLE a like on a proposition
export const toggleLike = createAsyncThunk(
  'trips/toggleLike',
  async ({
    tripId,
    propositionId,
  }: {
    tripId: string | null;
    propositionId: string | null;
  }) => {
    const { data } = await axiosInstance.post(
      `/trips/${tripId}/links/${propositionId}/like`
    );
    return data;
  }
);

// Create action to SET the destination suggestions from the API geoapify
export const setSuggestions = createAsyncThunk(
  'trips/setSuggestions',
  async (obj: object) => {
    const { data } = await axiosInstance.post('/trips/autocomplete', obj);
    return data;
  }
);

// Create action to RESET the destination suggestions
export const resetSuggestions = createAction('trips/resetSuggestions');

const tripReducer = createReducer(initialState, (builder) => {
  builder
    // FETCH Trip Data
    .addCase(fetchTripData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchTripData.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
      state.isLoading = false;
    })
    // UPDATE Trip
    .addCase(updateTrip.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateTrip.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
      toast.success('Le voyage a bien été modifié !');
      state.errorMessage = null;
      state.isLoading = false;
    })
    .addCase(updateTrip.rejected, (state) => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
      state.isLoading = false;
    })
    // SET/RESET Suggestions Destination in NewTrip and EditTrip
    .addCase(setSuggestions.fulfilled, (state, action) => {
      state.suggestions = action.payload;
    })
    .addCase(resetSuggestions, (state) => {
      state.suggestions = [];
    })
    // ADD Proposition
    .addCase(addProposition.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addProposition.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
      toast.success('La proposition a bien été ajoutée !');
      state.errorMessage = null;
      state.isLoading = false;
    })
    .addCase(addProposition.rejected, (state) => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
      state.isLoading = false;
    })
    // UPDATE Proposition
    .addCase(updateProposition.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateProposition.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
      toast.success('La proposition a bien été modifée !');
      state.errorMessage = null;
      state.isLoading = false;
    })
    .addCase(updateProposition.rejected, (state) => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
      state.isLoading = false;
    })
    // DELETE Proposition
    .addCase(deleteProposition.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
      toast.success('La proposition a bien été supprimée !');
    })
    .addCase(deleteProposition.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // DELETE a Member
    .addCase(deleteMember.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
      toast.success('Le membre a bien été supprimée !');
    })
    .addCase(deleteMember.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // TOGGLE like on a proposition
    .addCase(toggleLike.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
    })
    .addCase(toggleLike.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // FETCH One Member infos
    .addCase(informationMember.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
    })
    .addCase(informationMember.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    });
});

export default tripReducer;

// Imports
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

// Import Toast
import { toast } from 'react-toastify';

// Import axios
import axiosInstance from '../../utils/axios';

// Import types
import { Member, Proposition } from '../../@types';

// Type trip states
interface TripState {
  trip: {
    id: number | null;
    date_start: string | null;
    date_end: string | null;
    localisation: string | null;
    description: string | null;
    url_image: string | null;
    alt_image: string | null;
    user_id: number | null;
    members: Member[];
    links: Proposition[];
  };
  errorMessage: string | null;
}

// Trip Reducer initial states
export const initialState: TripState = {
  trip: {
    id: null,
    date_start: null,
    date_end: null,
    localisation: null,
    description: null,
    url_image: null,
    alt_image: null,
    user_id: null,
    members: [],
    links: [],
  },
  errorMessage: null,
};

const env = 'dev';

// Create action to fetch trip infos
export const fetchTripData = createAsyncThunk(
  'trip/fetchTripData',
  async (id: number | null) => {
    const { data } = await axiosInstance.get(`/trips/${id}`);
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

// Create action to update a proposition

const tripReducer = createReducer(initialState, (builder) => {
  builder
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

export default tripReducer;

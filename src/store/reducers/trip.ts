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
    localisation: string;
    lat: number | null;
    lon: number | null;
    description: string;
    url_image: string;
    alt_image: string;
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
  errorMessage: null,
};

// Create action to FETCH trip infos
export const fetchTripData = createAsyncThunk(
  'trip/fetchTripData',
  async (id: number | null) => {
    const { data } = await axiosInstance.get(`/trips/${id}`);
    return data;
  }
);

// Create action to UPDATE a trip
export const updateTrip = createAsyncThunk(
  'trip/updateTrip',
  async ({ formData, id }: { formData: FormData; id: number | null }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    const { data } = await axiosInstance.patch(`/trips/${id}`, objData);
    return data;
  }
);

// Create action to ADD a new proposition
export const addProposition = createAsyncThunk(
  'user/addProposition',
  async ({ formData, id }: { formData: FormData; id: number | null }) => {
    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);
    // Send a DELETE request to delete user account
    const { data } = await axiosInstance.post(`/trips/${id}/links`, objData);
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
    tripId: number | null;
    propositionId: number | null;
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
    tripId: number | null;
    propositionId: number | null;
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
    tripId: number | null;
    memberId: number | null;
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
    tripId: number | null;
    memberId: number | null;
  }) => {
    const { data } = await axiosInstance.delete(
      `/trips/${tripId}/members/${memberId}`
    );
    return data;
  }
);

// Create action to TOGGLE a like on a proposition
// export const toggleLike = createAsyncThunk(
//   'member/deleteMember',
//   async ({
//     tripId,
//     linkId,
//   }: {
//     tripId: number | null;
//     linkId: number | null;
//   }) => {
//     const { data } = await axiosInstance.delete(
//       `/trips/${tripId}/links/${linkId}`
//     );
//     return data;
//   }
// );

const tripReducer = createReducer(initialState, (builder) => {
  builder
    // FETCH Trip Data
    .addCase(fetchTripData.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
    })
    // UPDATE Trip
    .addCase(updateTrip.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
      toast.success('Le voyage a bien été modifié !');
      state.errorMessage = null;
    })
    .addCase(updateTrip.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // ADD Proposition
    .addCase(addProposition.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
      toast.success('La proposition a bien été ajoutée !');
      state.errorMessage = null;
    })
    .addCase(addProposition.rejected, () => {
      toast.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    })
    // UPDATE Proposition
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
    // FETCH One Member infos
    .addCase(informationMember.fulfilled, (state, action) => {
      state.trip = {
        ...state.trip,
        ...action.payload,
      };
    });
});

export default tripReducer;

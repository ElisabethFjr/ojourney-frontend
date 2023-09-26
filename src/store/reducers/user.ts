import { createReducer } from '@reduxjs/toolkit';

interface UserState {
  pseudo: string | null;
  isLoading: boolean;
}

export const initialState: UserState = {
  pseudo: null,
  isLoading: false,
};

const userReducer = createReducer(initialState, (builder) => {
  console.log("C'est un reducer");
});

export default userReducer;

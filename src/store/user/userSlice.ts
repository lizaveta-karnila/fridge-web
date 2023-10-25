import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from "firebase/auth";
import {restoreUserDataThunk, signInGoogleThunk, signOutThunk} from "./userThunks";

interface UserState {
  token: string | null;
  user: User | null;
}

const initialState: UserState = {
  token: null,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setToken(state, action: PayloadAction<UserState['token']>) {
      state.token = action.payload;
    },
    setUser(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signInGoogleThunk.fulfilled, (state: UserState, {payload}) => {
      state.token = payload.token;
      state.user = payload.user;
    })
    builder.addCase(restoreUserDataThunk.fulfilled, (state: UserState, {payload}) => {
      state.token = payload.token;
      state.user = payload.user;
    })
    builder.addCase(signOutThunk.fulfilled, (state: UserState) => {
      state.token = null;
      state.user = null;
    })
  },
})

export const userActions = userSlice.actions;

export default userSlice.reducer;

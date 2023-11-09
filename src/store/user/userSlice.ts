import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from "firebase/auth";
import {restoreUserDataThunk, signInGoogleThunk, signOutThunk} from "./userThunks";

interface IUserState {
  token: string | null;
  user: User | null;
}

const initialState: IUserState = {
  token: null,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setToken(state, action: PayloadAction<IUserState['token']>) {
      state.token = action.payload;
    },
    setUser(state, action: PayloadAction<IUserState['user']>) {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signInGoogleThunk.fulfilled, (state: IUserState, {payload}) => {
      state.token = payload.token;
      state.user = payload.user;
    })
    builder.addCase(restoreUserDataThunk.fulfilled, (state: IUserState, {payload}) => {
      state.token = payload.token;
      state.user = payload.user;
    })
    builder.addCase(signOutThunk.fulfilled, (state: IUserState) => {
      state.token = null;
      state.user = null;
    })
  },
})

export const userActions = userSlice.actions;

export default userSlice.reducer;

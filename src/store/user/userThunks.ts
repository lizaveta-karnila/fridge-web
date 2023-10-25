import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  User
} from "firebase/auth";
import {signOut as firebaseSignOut} from "@firebase/auth";

export const signInGoogleThunk = createAsyncThunk<{ token: string, user: User | null }>(
  'user/signInGoogle',
  async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const authResult = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(authResult);
    if (!credential?.accessToken) throw new Error('Failed to auth');
    const token = credential.accessToken;
    const user = authResult.user;
    return {
      token,
      user,
    };
  }
);

export const restoreUserDataThunk = createAsyncThunk<{ token: string, user: User }>(
  'user/restoreUserData',
  async () => {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    if (!auth.currentUser) throw new Error('No user :)');
    const token: string = await auth.currentUser.getIdToken();
    return {
      token,
      user: auth.currentUser,
    };
  }
);

export const signOutThunk = createAsyncThunk<void>(
  'user/signOut',
  async () => {
    const auth = getAuth();
    await firebaseSignOut(auth);
  }
)

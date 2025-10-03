import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logOut } from "./authService";
import Oauth from "../../Components/Oauth";

type User = {
  name: string;
  email: string;
};

type AuthState = {
  isError: boolean;
  isLoading: boolean;
  isSucess: boolean;
  message: string;
  user: User | null;
};

type SignUpData = { displayName: string; email: string; password: string };

const initialState: AuthState = {
  user: null,
  isError: false,
  isLoading: false,
  isSucess: false,
  message: "",
};

// Sign up
export const signUp = createAsyncThunk<
  { name: string; email: string },
  SignUpData,
  { rejectValue: string }
>("auth/signup", async (userData, thunkAPI) => {
  try {
    const { email, password, displayName } = userData;
    return await registerUser(email, password, displayName);
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("failed to sign up");
  }
});

// Google sign-in
// Google sign-in
export const signUpWithGoogle = createAsyncThunk<
  { name: string; email: string },
  void,
  { rejectValue: string }
>("auth/signInWithGoogle", async (_, thunkAPI) => {
  try {
    const result = await Oauth.signInWithGoogle();
    console.log(result, "hello result");
    
      // Correctly return the required object structure
      return {
        name: result.name ?? "",
        email: result.email ?? "",
      };
   
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Google sign-in failed");
  }
});

// Email/password sign-in
export const signIn = createAsyncThunk<
  { email: string; name: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/signin", async (userData, thunkAPI) => {
  try {
    const { email, password } = userData;
    return await loginUser(email, password);
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("failed to sign in");
  }
});

// Sign out
export const signOut = createAsyncThunk("auth/signout", async () => {
  await logOut();
  return null;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetFlags: (state) => {
      state.isSucess = false;
      state.isError = false;
      state.message = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSucess = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload ?? "Unknown error occurred";
        state.isLoading = false;
        state.isSucess = false;
        state.user = null;
      })
      // Google sign-in
      .addCase(signUpWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSucess = true;
      })
      .addCase(signUpWithGoogle.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload ?? "Google sign-in failed";
        state.isLoading = false;
        state.isSucess = false;
        state.user = null;
      })
      // Email/password sign-in
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSucess = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload ?? "Unknown error occurred";
        state.isLoading = false;
        state.isSucess = false;
      })
      // Sign out
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isSucess = false;
        state.isError = false;
        state.message = "";
      });
  },
});

export const { resetFlags } = authSlice.actions;
export default authSlice.reducer;

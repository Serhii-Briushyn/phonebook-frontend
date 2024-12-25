import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const goItApi = axios.create({
  baseURL: "https://phonebook-backend-orpb.onrender.com",
  withCredentials: true,
});

// const setAuthHeader = (token) => {
//   goItApi.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   goItApi.defaults.headers.common.Authorization = "";
// };

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await goItApi.post("/auth/register", credentials);
      // setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return thunkAPI.rejectWithValue(
          "User with this email is already registered"
        );
      }
      return thunkAPI.rejectWithValue("Registration failed. Please try again.");
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await goItApi.post("/auth/login", credentials);
      // setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("Invalid email or password.");
      }
      return thunkAPI.rejectWithValue("Login failed. Please try again later.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await goItApi.post("/auth/logout");
    // clearAuthHeader();
  } catch {
    return thunkAPI.rejectWithValue("Logout failed. Please try again.");
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const persistedToken = state.auth.data.accessToken;
    // if (persistedToken === null) {
    //   return thunkAPI.rejectWithValue("No valid token found. Please log in.");
    // }

    try {
      // setAuthHeader(persistedToken);
      const res = await goItApi.post("/auth/refresh");
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Failed to refresh user. Please log in again."
      );
    }
  }
);

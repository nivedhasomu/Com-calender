import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SLICE_NAMES } from "../../constants/enums";
import { axios_instance } from "../../lib/axios";
import { errorToast } from "../../lib/toast";

export const loginUser = createAsyncThunk(
  "users/loginStatus",
  async (credentials: { emailId: string; password: string }) => {
    try {
      const response = await axios_instance.post("/user/login", credentials);
      console.log(response.data);
      if (!response.data.ok) {
        // Check for non-200 status code
        console.log(response);
      }
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.message);
      return error;
    }
  },
);

export const createUser = createAsyncThunk(
  "users/registerStatus",
  async (credentials: {
    emailId: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const response = await axios_instance.post("/user/register", credentials);
      console.log(response);
      if (!response.data.ok) {
        // Check for non-200 status code
        console.log(response);
      }
      return response.data;
    } catch (error: any) {
      errorToast(error.response.data.message);
      return error;
    }
  },
);

const initialState = localStorage.getItem(SLICE_NAMES.USER)
  ? JSON.parse(localStorage.getItem(SLICE_NAMES.USER) || "")
  : null;

const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState,
  reducers: {
    setUser: (state, actions) => {
      // set local storage
      localStorage.setItem(SLICE_NAMES.USER, JSON.stringify(actions.payload));

      // set state
      return {
        ...state,
        ...actions.payload,
      };
    },

    logoutUser: (_state) => {
      // remove local storage
      localStorage.removeItem(SLICE_NAMES.USER);

      // set state
      return null;
    },
  },
  extraReducers: (_builder) => {
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

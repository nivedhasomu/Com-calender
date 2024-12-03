import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../../constants/enums";

const initialState = {
  communicationMethods: []
}

const communicationSlice = createSlice({
  name: SLICE_NAMES.COMMUNICATION,
  initialState,
  reducers: {
    setCommunicationMethods: (state, actions) => {
      return {
        ...state,
        ...actions.payload
      }
    }
  }
})

export const { setCommunicationMethods } = communicationSlice.actions;

export default communicationSlice.reducer;
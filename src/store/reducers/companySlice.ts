import { createSlice } from "@reduxjs/toolkit"
import { SLICE_NAMES } from "../../constants/enums"

const initialState: any = {
  companies: [],
  notifications: {
    overdue: [],
    today: []
  }
}

const companySlice = createSlice({
  name: SLICE_NAMES.COMPANY,
  initialState,
  reducers: {
    setCompany: (state, actions) => {
      return {
        ...state,
        companies: actions.payload
      }
    },
    setNotification: (state, actions) => {
      return {
       ...state,
        notifications: actions.payload
      }
    }
  }
})

export const { setCompany, setNotification } = companySlice.actions;

export default companySlice.reducer;
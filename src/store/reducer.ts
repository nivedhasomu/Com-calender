import { combineReducers } from "redux";

import userReducer from "./reducers/userSlice";
import companyReducer from "./reducers/companySlice"
import communicationReducer from "./reducers/communicationSlice"

const rootReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
  communication: communicationReducer,
});

export default rootReducer;

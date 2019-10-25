import { combineReducers } from "redux";

import globalReducer from "./globalReducer";
import authReducer from './authReducer';

export default combineReducers({
  global: globalReducer,
  auth: authReducer
});

import { combineReducers } from '@reduxjs/toolkit';
import csvReducer from './csvReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  csvData: csvReducer,
  auth: authReducer,
});

export default rootReducer;

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { scheduleReducer } from './scheduleSlice';
import { weekDataReducer } from './weekDataSlice';
import { selectsDataReducer } from './selectsData';

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  weekData: weekDataReducer,
  selectsData: selectsDataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true
    }).concat(thunk),
});

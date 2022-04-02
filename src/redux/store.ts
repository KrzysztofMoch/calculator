import { combineReducers, configureStore } from '@reduxjs/toolkit';
import calculatorSlice from './calculatorSlice';

const store = configureStore({
  reducer: {
    calculator: calculatorSlice,
  },
});

const rootReducer = combineReducers({
  calculator: calculatorSlice,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default store;

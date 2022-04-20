import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type History = {expr: string, result: string}

interface CalculatorSliceType {
  result: string;
  expr: string[];
  equalled: boolean;
  history: History[] | []
}

const initialState = {
  result: '',
  expr: [''],
  equalled: true,
  history: [],
} as CalculatorSliceType;

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setAll(state, action: PayloadAction<CalculatorSliceType>) {
      return action.payload;
    },
    setResult(state, action: PayloadAction<string>) {
      state.result = action.payload;
    },
    setExpr(state, action: PayloadAction<string[]>) {
      state.expr = action.payload;
    },
    setEqualled(state, action: PayloadAction<boolean>) {
      state.equalled = action.payload;
    },
    addToHistory(state, action: PayloadAction<History>){
      state.history = [...state.history, action.payload];
    },
    clearHistory(state){
      state.history = [];
    }
  },
});

export type { History }
export const { setAll, setResult, setExpr, setEqualled, addToHistory, clearHistory } = calculatorSlice.actions;
export default calculatorSlice.reducer;

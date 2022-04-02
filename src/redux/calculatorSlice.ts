import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalculatorSliceType {
  result: string;
  expr: string[];
  equalled: boolean;
}

const initialState = {
  result: '0',
  expr: ['0'],
  equalled: false,
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
  },
});

export const { setAll, setResult, setExpr, setEqualled } = calculatorSlice.actions;
export default calculatorSlice.reducer;

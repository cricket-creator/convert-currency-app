import { createReducer } from "@reduxjs/toolkit";
import { formOnload, formLoaded, formFailed, formSwap, formCalculate, formClear } from "./action";
import { IFormReducer } from "../../utils/interfaces";

const initialState: IFormReducer = {
  baseCurrency: {
    code: "",
    value: 0,
  },
  convertedCurrency: {
    code: "",
    value: 0,
  },
  currencies: {},
  error: null
};

export const formReducer = createReducer<IFormReducer>(initialState, builder => {
  builder
    .addCase(formOnload, () => {
    })
    .addCase(formLoaded, (state, { payload }) => {
      state.baseCurrency.code = payload.code;
      state.currencies = payload.data;
      state.error = null;
    })
    .addCase(formFailed, (state, { payload }) => {
      state.error = payload.error;
    })
    .addCase(formSwap, (state, { payload }) => {
      state.baseCurrency = payload.convertedCurrency;
      state.convertedCurrency = payload.baseCurrency;
    })
    .addCase(formCalculate, (state, { payload }) => {
      state.baseCurrency = payload.baseCurrency;
      state.convertedCurrency = payload.convertedCurrency;
    })
    .addCase(formClear, (state, { payload }) => {
      state.baseCurrency = { code: payload, value: 0 };
      state.convertedCurrency = { code: "", value: 0 };
    })
    .addDefaultCase(() => {
    });
});
import { createReducer } from "@reduxjs/toolkit";
import { formOnload, formLoaded, formFailed, formChange, formCalculate } from "./action";
import { IFormReducer } from "../../utils/interfaces";

const initialState: IFormReducer = {
  baseCurrency: {
    type: "",
    value: 1
  },
  convertedCurrency: 0,
  currencies: {},
  error: null
};

export const formReducer = createReducer<IFormReducer>(initialState, builder => {
  builder
    .addCase(formOnload, () => {
    })
    .addCase(formLoaded, (state, { payload }) => {
      state.baseCurrency.type = payload.query.base_currency;
      state.currencies = payload.data;
    })
    .addCase(formFailed, (state, { payload }) => {
      state.error = payload.error;
    })
    .addCase(formChange, (state, { payload }) => {
    })
    .addCase(formCalculate, (state, { payload }) => {
      state.convertedCurrency = payload;
    })
    .addDefaultCase(() => {
    });
});
import { Dispatch } from "redux";
import { createAction } from "@reduxjs/toolkit";
import { formAction } from "./action-type";
import { urls } from "../../utils/urls";
import { ICurrencies, IQuery, IResponse, IFormLoaded, ICurrency, IFormCalculate } from "../../utils/interfaces";
import { BaseCurrencies } from "../../utils/enums";
/*
* @Actions
* */
export const formOnload = createAction<void, string>(formAction.onload);
export const formLoaded = createAction<IFormLoaded, string>(
  formAction.loaded,
  (query: IQuery, data: ICurrencies) => ({ payload: { query, data } })
);
export const formFailed = createAction<any, string>(formAction.failed);
export const formSwap = createAction<IFormCalculate, string>(
  formAction.swap,
  (baseCurrency: ICurrency, convertedCurrency: ICurrency) => ({ payload: { baseCurrency, convertedCurrency } })
);
export const formCalculate = createAction<IFormCalculate, string>(
  formAction.calculate,
  (baseCurrency: ICurrency, convertedCurrency: ICurrency) => ({ payload: { baseCurrency, convertedCurrency } })
);
export const formClear = createAction<string, string>(formAction.clear);
/*
* @Middleware
* */
export const formGetCurrencies = (baseCurrency: string) => async (dispatch: Dispatch) => {
  dispatch(formOnload());

  try {
    const response = await fetch(
      urls.currencies + (baseCurrency ? `&base_currency=${baseCurrency}` : "")
    );
    const json: any = await response.json();

    if (!response.ok)
      throw new Error(json.message || "Some error!");

    const { query, data }: IResponse = json;

    if (query.base_currency === BaseCurrencies.USD) {
      data.USD = 1.00;
    }

    dispatch(formLoaded(query, data));
  } catch (e: any) {
    dispatch(formFailed(e));
  }
};
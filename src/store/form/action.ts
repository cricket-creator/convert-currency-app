import { Dispatch } from "redux";
import { createAction } from "@reduxjs/toolkit";
import { formAction } from "./action-type";
import { urls } from "../../utils/urls";
import { ICurrencies, IResponse, IFormLoaded, ICurrency, IFormCalculate } from "../../utils/interfaces";
/*
* @Actions
* */
export const formOnload = createAction<void, string>(formAction.onload);
export const formLoaded = createAction<IFormLoaded, string>(
  formAction.loaded,
  (code: string, data: ICurrencies) => ({ payload: { code, data } })
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
export const formGetCurrencies = (base_currency: string) => async (dispatch: Dispatch) => {
  dispatch(formOnload());

  try {
    const searchParams = new URLSearchParams({
      apikey: "c15142a0-90cf-11ec-982b-8d721899beca",
      base_currency,
    });

    if(!base_currency)
      searchParams.delete('base_currency');

    const response = await fetch(urls.currencies + '?' + searchParams);

    const json: any = await response.json();

    if (!response.ok)
      throw new Error(json.message || "Some error!");

    const { data }: IResponse = json;

    dispatch(formLoaded(base_currency, data));
  } catch (e: any) {
    dispatch(formFailed(e));
  }
};
import { Dispatch } from "redux";
import { createAction } from "@reduxjs/toolkit";
import { formAction } from "./action-type";
import { urls } from "../../utils/urls";
import { ICurrencies, IQuery, IResponce, IFormLoaded } from "../../utils/interfaces";
import { BaseCurrencies } from "../../utils/enums";

export const formOnload = createAction<void, string>(formAction.onload);
export const formLoaded = createAction<IFormLoaded, string>(
  formAction.loaded,
  (query: IQuery, data: ICurrencies) => ({ payload: { query, data } })
);
export const formFailed = createAction<any, string>(formAction.failed);
export const formChange = createAction<void, string>(formAction.change,);
export const formCalculate = createAction<number, string>(formAction.calculate);

export const formGetCurrencies = (baseCurrency: string) => async (dispatch: Dispatch) => {
  dispatch(formOnload());

  try {
    const response = await fetch(
      urls.currency + (baseCurrency ? `&base_currency=${baseCurrency}` : "")
    );
    const json: any = await response.json();

    if (!response.ok)
      throw new Error(json.message || "Some error!");

    let { query, data }: IResponce = json;

    if (query.base_currency === BaseCurrencies.USD) {
      data.USD = 1.00;
    }

    dispatch(formLoaded(query, data));
  } catch (e: any) {
    dispatch(formFailed(e));
  }
};

export const formGetCalculations = (
  value: number,
  convertTo: string,
  currencies: ICurrencies
) => (dispatch: Dispatch) => {
  let convertCurrency: number;
  let sum: number = 0;

  for (const key in currencies) {
    if (key === convertTo) {
      convertCurrency = currencies[key];
      sum = convertCurrency + value;
    }
  }
  dispatch(formCalculate(sum));
};
import { createAction } from "@reduxjs/toolkit";
import { formAction } from "./action-type";
import { urls } from "../../utils/urls";
import { ICurrencies } from "../../utils/interfaces";
import { BaseCurrencies } from "../../utils/Currencies";

interface IFormLoadedPA {
  payload: {
    data: any,
    query: any
  };
}

interface IFormLoaded {
  (data: any, query: any): IFormLoadedPA;
}

export const formOnload = createAction<void, string>(formAction.onload);
export const formLoaded = createAction<IFormLoaded, string>(
  formAction.loaded,
  (query: any, data: any) => ({ payload: { query, data } })
);
export const formFailed = createAction<any, string>(formAction.failed);
export const formChange = createAction<void, string>(formAction.change,);
export const formCalculate = createAction<number, string>(formAction.calculate);

export const formGetValutes = (baseCurrency: string | undefined) => async (dispatch: any) => {
  dispatch(formOnload());

  try {
    const response = await fetch(
      urls.currency + (baseCurrency ? `&base_currency=${baseCurrency}` : "")
    );
    const json: any = await response.json();

    if (!response.ok)
      throw new Error(json.text || "Some error!");

    let { query, data }: { query: any, data: any } = json;

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
) => (dispatch: any) => {
  let convertCurrency: number;
  let sum: number = 0;

  for (const key in currencies) {
    if (key === convertTo) {
      convertCurrency = currencies[key];
      sum = convertCurrency + value;
    }
  }
  console.log(sum);
  dispatch(formCalculate(sum));
};
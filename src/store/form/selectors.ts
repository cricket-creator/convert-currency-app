import { ICurrency, ICurrencies, IFormReducer } from "../../utils/interfaces";
/*
* @Selecting currencies
* */
export const selectCurrencies = (state: IFormReducer): ICurrencies => state.currencies;
export const selectCurrenciesList = (state: IFormReducer): string[] => Object.keys(state.currencies);
/*
* @Selecting base currency values
* */
export const selectBaseCurrency = (state: IFormReducer): ICurrency => state.baseCurrency;
export const selectBaseCurrencyCode = (state: IFormReducer): string => state.baseCurrency.code;
export const selectBaseCurrencyValue = (state: IFormReducer): number => state.baseCurrency.value;
/*
* @Selecting converted currency values
* */
export const selectConvertedCurrency = (state: IFormReducer): ICurrency => state.convertedCurrency;
export const selectConvertedCurrencyCode = (state: IFormReducer): string => state.convertedCurrency.code;
export const selectConvertedCurrencyValue = (state: IFormReducer): number => state.convertedCurrency.value;
export const selectError = (state: IFormReducer): Error | null => state.error;
/*
* @Selecting exact currency value
* */
export const selectExactCurrencyValue = (code: string) => (state: IFormReducer): number => {
  return state.currencies[code as keyof ICurrencies].value;
};
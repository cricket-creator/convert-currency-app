import { ICurrency, ICurrencies, IFormReducer } from "../../utils/interfaces";
/*
* @Select Currencies
* */
export const selectCurrencies = (state: IFormReducer): ICurrencies => state.currencies;
export const selectCurrenciesList = (state: IFormReducer): string[] => Object.keys(state.currencies);
/*
* @Selecting BaseCurrency values
* */
export const selectBaseCurrency = (state: IFormReducer): ICurrency => state.baseCurrency;
export const selectBaseCurrencyType = (state: IFormReducer): string => state.baseCurrency.type;
export const selectBaseCurrencyValue = (state: IFormReducer): number | string => state.baseCurrency.value;
/*
* @Selecting ConvertedCurrency values
* */
export const selectConvertedCurrency = (state: IFormReducer): ICurrency => state.convertedCurrency;
export const selectConvertedCurrencyType = (state: IFormReducer): string => state.convertedCurrency.type;
export const selectConvertedCurrencyValue = (state: IFormReducer): number => state.convertedCurrency.value;
export const selectError = (state: IFormReducer): Error | null => state.error;
/*
* @Selecting exact currency value
* */
export const selectExactCurrencyValue = (type: string) => (state: IFormReducer): number => {
  return state.currencies[type as keyof ICurrencies];
};
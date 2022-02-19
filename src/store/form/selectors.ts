import { IBaseCurrency, ICurrencies, IFormReducer } from "../../utils/interfaces";

export const selectCurrencies = (state: IFormReducer): ICurrencies => state.currencies;
export const selectCurrenciesList = (state: IFormReducer): string[] => Object.keys(state.currencies);
export const selectBaseCurrency = (state: IFormReducer): IBaseCurrency => state.baseCurrency;
export const selectBaseCurrencyType = (state: IFormReducer): string => state.baseCurrency.type;
export const selectBaseCurrencyValue = (state: IFormReducer): number | string => state.baseCurrency.value;
export const selectExactCurrencyValue = (type: string) => (state: IFormReducer): number => {
  return state.currencies[type as keyof ICurrencies];
};
export const selectConvertedCurrency = (state: IFormReducer): number => state.convertedCurrency;
export const selectError = (state: IFormReducer): Error | null => state.error;
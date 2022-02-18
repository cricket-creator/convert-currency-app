export interface IFormAction {
  onload: string;
  loaded: string;
  failed: string;
  change: string;
  calculate: string;
}

export interface IBaseCurrency {
  type: string | undefined,
  value: number | undefined
}

export interface ICurrencies {
  [key: string]: number;
}

export interface IFormReducer {
  baseCurrency: IBaseCurrency;
  convertedCurrency: number;
  currencies: ICurrencies;
  error: Error | null;
}

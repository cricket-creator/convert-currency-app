export interface IQuery {
  apikey: string;
  base_currency: string;
  timestamp: number;
}

export interface IResponce {
  query: IQuery;
  data: ICurrencies;
}

export interface IFormAction {
  [key: string]: string
}

export interface IFormLoadedPA {
  payload: {
    data: ICurrencies,
    query: IQuery
  };
}

export interface IFormLoaded {
  (data: IQuery, query: ICurrencies): IFormLoadedPA;
}

export interface IBaseCurrency {
  type: string;
  value: number;
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

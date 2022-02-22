/*
* @Response
* */
export interface IQuery {
  base_currency: string;
}

export interface IResponse {
  query: IQuery;
  data: ICurrencies;
}

/*
* @Form actions
* */
export interface IFormAction {
  [key: string]: string;
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

export interface IFormCalculatePA {
  payload: {
    baseCurrency: ICurrency,
    convertedCurrency: ICurrency
  };
}

export interface IFormCalculate {
  (baseCurrency: ICurrency, convertedCurrency: ICurrency): IFormCalculatePA;
}

/*
* @Form reducer
* */
export interface ICurrency {
  type: string;
  value: number;
}

export interface ICurrencies {
  [key: string]: number;
}

export interface IFormReducer {
  baseCurrency: ICurrency;
  convertedCurrency: ICurrency;
  currencies: ICurrencies;
  error: Error | null;
}

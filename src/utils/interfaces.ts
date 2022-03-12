/*
* @Response
* */
export interface IQuery {
  base_currency: string;
}

export interface IResponse {
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
    code: string
  };
}

export interface IFormLoaded {
  (code: string, data: ICurrencies): IFormLoadedPA;
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
  code: string;
  value: number;
}

export interface ICurrencies {
  [key: string]: ICurrency;
}

export interface IFormReducer {
  baseCurrency: ICurrency;
  convertedCurrency: ICurrency;
  currencies: ICurrencies;
  error: Error | null;
}

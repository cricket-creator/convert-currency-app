import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectChangeEvent, Button } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import { FormItem } from "../form-item";
import {
  selectBaseCurrency,
  selectConvertedCurrency,
  selectCurrencies
} from "../../store/form/selectors";
import { formSwap, formCalculate, formClear, formGetCurrencies } from "../../store/form/action";
import { ICurrency, ICurrencies, IFormReducer } from "../../utils/interfaces";
import { CurrencyType } from "../../utils/enums";
import style from "./form.module.scss";

interface IFormProps<T> {
  options: T[];
  onRender: (item: T, idx: number) => React.ReactNode;
}

export function Form<T>({ options, onRender }: IFormProps<T>) {
  const baseCurrency = useSelector<IFormReducer, ICurrency>(selectBaseCurrency);
  const convertedCurrency = useSelector<IFormReducer, ICurrency>(selectConvertedCurrency);
  const currencies = useSelector<IFormReducer, ICurrencies>(selectCurrencies);
  const dispatch = useDispatch();
  const [form, setForm] = useState<ICurrency>({
    code: "", value: 0
  });
  const [toConvert, setToConvert] = useState<ICurrency>({
    code: "", value: 0
  });

  const exactCurrency = useMemo((): number => {
    let currencyValue: number = 0;

    for (const key in currencies) {
      if (key === toConvert.code) {
        currencyValue = +currencies[key].value;
      }
    }
    return currencyValue;
  }, [currencies, toConvert.code]);

  const handleSelectChange = useCallback((event: SelectChangeEvent): void => {
    if (event.target.name === CurrencyType.convert) {
      setToConvert(prev => ({ ...prev, code: event.target.value }));
    } else {
      setForm(prev => ({ ...prev, [event.target.name as keyof ICurrency]: event.target.value }));
      dispatch(formGetCurrencies(event.target.value));
    }
  }, [dispatch]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!(+event.target.value < 0))
      setForm(prev => ({ ...prev, value: +event.target.value }));
  }, []);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const result: number = +(exactCurrency * form.value).toFixed(4);
    setToConvert(prev => ({ ...prev, value: result }));
    dispatch(formCalculate({ ...form }, { ...toConvert, value: result }));
  };

  const handleSwapClick = (): void => {
    const formCurrency = { ...form };
    setForm(({ ...toConvert }));
    dispatch(formSwap(formCurrency, toConvert));
    dispatch(formGetCurrencies(toConvert.code));
    setToConvert({ ...formCurrency });
  };

  const handleFormClear = () => {
    dispatch(formClear(form.code));
    setToConvert({ code: "", value: 0 });
  };

  useEffect(() => {
    if (baseCurrency.code)
      setForm(prev => ({ ...prev, ...baseCurrency }));

    if (convertedCurrency.code)
      setToConvert(prev => ({ ...prev, ...convertedCurrency }));
  }, [baseCurrency, convertedCurrency]);

  return (
    <form className={style.form}>
      <div className={style.form__wrap}>
        <FormItem
          title={"?? ???????? ????????"}
          form={form}
          onSelect={handleSelectChange}
          onInput={handleInputChange}
          exactCurrency={exactCurrency}
          convertType={toConvert.code}
          options={options}
          onRender={onRender}
        />

        <div className={style.form__swap}>
          <Button
            className={style.form__swap_btn}
            onClick={handleSwapClick}
            disabled={!toConvert.code}
          >
            <SwapHoriz />
          </Button>
        </div>

        <FormItem
          title={"?? ????????????"}
          form={toConvert}
          onSelect={handleSelectChange}
          onInput={handleInputChange}
          exactCurrency={exactCurrency}
          convertType={form.code}
          resultingForm={true}
          options={options}
          onRender={onRender}
        />
      </div>

      <Button
        type="submit"
        className={style.form__btn}
        onClick={handleButtonClick}
        disabled={!toConvert.code}
      >
        ????????????????????????????
      </Button>

      <Button
        type="reset"
        className={style.form__btn}
        onClick={handleFormClear}
      >
        ????????????????
      </Button>
    </form>
  );
}
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectChangeEvent, Button } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import { FormItem } from "../form-item";
import { selectBaseCurrency, selectCurrencies } from "../../store/form/selectors";
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
  const currencies = useSelector<IFormReducer, ICurrencies>(selectCurrencies);
  const dispatch = useDispatch();
  const [form, setForm] = useState<ICurrency>({
    type: "", value: 1
  });
  const [toConvert, setToConvert] = useState<ICurrency>({
    type: "", value: 0
  });

  const exactCurrency = useMemo((): number => {
    let currencyValue: number = 0;

    for (const key in currencies) {
      if (key === toConvert.type) {
        currencyValue = +currencies[key];
      }
    }
    return currencyValue;
  }, [currencies, toConvert.type]);

  const handleSelectChange = useCallback((event: SelectChangeEvent): void => {
    if (event.target.name === CurrencyType.convert) {
      setToConvert(prev => ({ ...prev, type: event.target.value }));
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
    dispatch(formGetCurrencies(toConvert.type));
    setToConvert({ ...formCurrency });
  };

  const handleFormClear = () => {
    dispatch(formClear(form.type));
    setToConvert({ type: "", value: 0 });
  };

  useEffect(() => {
    setForm(prev => ({ ...prev, ...baseCurrency }));
  }, [baseCurrency]);

  return (
    <form className={style.form}>
      <div className={style.form__wrap}>
        <FormItem
          title={"У меня есть"}
          form={form}
          onSelect={handleSelectChange}
          onInput={handleInputChange}
          exactCurrency={exactCurrency}
          convertType={toConvert.type}
          resultingForm={false}
          options={options}
          onRender={onRender}
        />

        <div className={style.form__swap}>
          <Button
            className={style.form__swap_btn}
            onClick={handleSwapClick}
            disabled={!toConvert.type}
          >
            <SwapHoriz />
          </Button>
        </div>

        <FormItem
          title={"Я получу"}
          form={toConvert}
          onSelect={handleSelectChange}
          onInput={handleInputChange}
          exactCurrency={exactCurrency}
          convertType={form.type}
          resultingForm={true}
          options={options}
          onRender={onRender}
        />
      </div>

      <Button
        type="submit"
        className={style.form__btn}
        onClick={handleButtonClick}
        disabled={!toConvert.type}
      >
        Конвертировать
      </Button>

      <Button
        type="reset"
        className={style.form__btn}
        onClick={handleFormClear}
      >
        Сбросить
      </Button>
    </form>
  );
}
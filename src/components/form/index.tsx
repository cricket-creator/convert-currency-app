import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  Select,
  TextField,
  SelectChangeEvent,
  Button
} from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import { IBaseCurrency, ICurrencies, IFormReducer } from "../../utils/interfaces";
import {
  selectBaseCurrency,
  selectCurrencies
} from "../../store/form/selectors";
import { formGetCurrencies } from "../../store/form/action";
import style from "./form.module.scss";

interface IFormProps<T> {
  options: T[];
  onRender: (item: T, idx: number) => React.ReactNode;
}

export function Form<T>({ options, onRender }: IFormProps<T>) {
  const baseCurrency = useSelector<IFormReducer, IBaseCurrency>(selectBaseCurrency);
  const currencies = useSelector<IFormReducer, ICurrencies>(selectCurrencies);
  const dispatch = useDispatch();
  const [form, setForm] = useState<IBaseCurrency>({
    type: "", value: 1
  });
  const [toConvert, setToConvert] = useState<IBaseCurrency>({
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

  const handleSelectChange = (event: SelectChangeEvent): void => {
    if (event.target.name === "convertType") {
      setToConvert(prev => ({ ...prev, type: event.target.value }));
      return;
    }

    setForm(prev => ({ ...prev, [event.target.name as keyof IBaseCurrency]: event.target.value }));
    dispatch(formGetCurrencies(event.target.value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!(+event.target.value < 0))
      setForm(prev => ({ ...prev, value: +event.target.value }));
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const result: number = +(exactCurrency * form.value).toFixed(4);
    setToConvert(prev => ({ ...prev, value: result }));
  };

  const handleSwapClick = (): void => {
    const formCurrency = { ...form };

    setForm(({ ...toConvert }));
    dispatch(formGetCurrencies(toConvert.type));
    setToConvert({ ...formCurrency });
  };

  useEffect(() => {
    setForm(prev => ({ ...prev, type: baseCurrency.type }));
  }, [baseCurrency]);

  return (
    <form className={style.form}>
      <div className={style.form__wrap}>
        <div className={style.form__item}>
          <h3 className={style.form__title}>У меня есть</h3>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              name="type"
              value={form.type}
              onChange={handleSelectChange}
            >
              {options.map(onRender)}
            </Select>
          </FormControl>
          <div className={style.form__input}>
            <TextField
              fullWidth
              type="number"
              value={form.value}
              variant="outlined"
              onChange={handleInputChange}
            />
            <div className={style.form__currency}>{form.type}</div>
          </div>
          {
            !!toConvert.type &&
            <div style={{ fontWeight: "normal", fontSize: "14px" }}>
              {`1 ${form.type} = ${exactCurrency.toFixed(4)} ${toConvert.type}`}
            </div>
          }
        </div>

        <div className={style.form__swap}>
          <Button
            className={style.form__swap_btn}
            onClick={handleSwapClick}
          >
          <SwapHoriz />
        </Button>
        </div>

        <div className={style.form__item}>
          <h3 className={style.form__title}>Я получу</h3>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              name="convertType"
              value={toConvert.type}
              onChange={handleSelectChange}
            >
              {options.map(onRender)}
            </Select>
          </FormControl>
          <div className={style.form__input}>
            <div className={style.form__output}>
              {toConvert.value}
            </div>
            <div className={style.form__currency}>{toConvert.type}</div>
          </div>
          {
            !!toConvert.type &&
            <div style={{ fontWeight: "normal", fontSize: "14px" }}>
              {`1 ${toConvert.type} = ${(1 / exactCurrency).toFixed(4)} ${form.type}`}
            </div>
          }
        </div>
      </div>
      <Button
        type="submit"
        className={style.form__btn}
        onClick={handleButtonClick}
        disabled={!toConvert.type}
      >
        Конвертировать
      </Button>
    </form>
  );
}
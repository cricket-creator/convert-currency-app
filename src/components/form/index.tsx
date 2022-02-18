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
import { formGetValutes } from "../../store/form/action";
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
    type: "",
    value: 1
  });
  const [toConvert, setToConvert] = useState<IBaseCurrency>({
    type: "",
    value: 0
  });

  const exactCurrency = useMemo((): number | undefined => {
    for (const key in currencies) {
      if (key === toConvert.type) {
        return currencies[key];
      }
    }
  }, [currencies, toConvert.type]);

  const handleSelectChange = (event: SelectChangeEvent): void => {
    event.preventDefault();
    if (event.target.name === "convertType") {
      setToConvert(prev => ({ ...prev, type: event.target.value }));
      return;
    }
    setForm(prev => ({ ...prev, [event.target.name as keyof IBaseCurrency]: event.target.value }));
    dispatch(formGetValutes(event.target.value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setForm(prev => ({ ...prev, value: +event.target.value }));
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    // @ts-ignore
    const result: number | undefined = exactCurrency * form.value;
    setToConvert(prev => ({ ...prev, value: result }));
  };

  const handleSwitchClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const formCurrency = { ...form };
    setForm(({ ...toConvert }));
    dispatch(formGetValutes(toConvert.type));
    setToConvert({ ...formCurrency });
  };

  useEffect(() => {
    setForm(prev => ({ ...prev, type: baseCurrency.type }));
  }, [baseCurrency]);

  return (
    <form
      className={style.form}
    >
      <div className={style.form__wrap}>
        <div className={style.form__item}>
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
              id="outlined-basic"
              type="number"
              value={form.value}
              variant="outlined"
              placeholder="Введите валюту"
              onChange={handleInputChange}
            />
            <div className={style.form__currency}>{form.type}</div>
          </div>
        </div>
        <Button onClick={handleSwitchClick}>
          <SwapHoriz />
        </Button>
        <div className={style.form__item}>
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
              {toConvert.value?.toFixed(4)}
            </div>
            <div className={style.form__currency}>{toConvert.type}</div>
          </div>
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
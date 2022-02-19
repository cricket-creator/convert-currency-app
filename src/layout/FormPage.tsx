import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "@mui/material";
import { formGetCurrencies } from "../store/form/action";
import { Form } from "../components/form";
import { IFormReducer } from "../utils/interfaces";
import { selectBaseCurrencyType, selectCurrenciesList } from "../store/form/selectors";

export function FormPage() {
  const currenciesList = useSelector<IFormReducer, string[]>(selectCurrenciesList);
  const baseCurrencyType = useSelector<IFormReducer, string>(selectBaseCurrencyType);
  const dispatch = useDispatch();

  const renderOptions = useCallback((item: string, idx: number): React.ReactNode => {
    return <MenuItem key={(Math.random() + idx) * 10000} value={item} children={item} />;
  }, []);

  useEffect(() => {
    dispatch(formGetCurrencies(baseCurrencyType));
  }, [dispatch]);

  return (
    <>
      <h2 className="title">Конвертатор валют</h2>
      <Form options={currenciesList} onRender={renderOptions} />
    </>
  );
}
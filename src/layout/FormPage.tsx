import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "@mui/material";
import { formGetValutes } from "../store/form/action";
import { Form } from "../components/form";
import { IFormReducer } from "../utils/interfaces";
import { selectCurrenciesList } from "../store/form/selectors";

export function FormPage() {
  const currenciesList = useSelector<IFormReducer, string[]>(selectCurrenciesList);
  const dispatch = useDispatch();

  const renderOptions = useCallback((item: string, idx: number): React.ReactNode => {
    return <MenuItem key={(Math.random() + idx) * 10000} value={item} children={item} />;
  }, []);

  useEffect(() => {
    dispatch(formGetValutes("RUB"));
  }, [dispatch]);

  return (
    <>
      <h2 className="title">Конвертатор валют</h2>
      <Form options={currenciesList} onRender={renderOptions} />
    </>
  );
}
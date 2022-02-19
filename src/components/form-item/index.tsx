import React from "react";
import { FormControl, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ICurrency } from "../../utils/interfaces";
import style from "./form-item.module.scss";

interface IFormItemProps<T> {
  title?: string;
  form: ICurrency;
  onSelect: (event: SelectChangeEvent) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  exactCurrency: number;
  convertType: string;
  resultingForm: boolean;
  options: T[];
  onRender: (item: T, idx: number) => React.ReactNode;
}

export function FormItem<T>(props: IFormItemProps<T>) {
  return (
    <div className={style.item}>
      <h3 className={style.item__title}>{props.title}</h3>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          name={props.resultingForm ? "convertType" : "type"}
          value={props.form.type}
          onChange={props.onSelect}
        >
          {props.options.map(props.onRender)}
        </Select>
      </FormControl>
      <div className={style.item__input}>
        {
          <TextField
            fullWidth
            name={props.resultingForm ? "convertType" : "type"}
            type="number"
            value={props.form.value}
            variant="outlined"
            onChange={props.onInput}
          />
        }
        <div className={style.item__currency}>{props.form.type}</div>
      </div>
      {
        !!(props.convertType && props.form.type) &&
        <div className={style.item__compare}>
          {
            props.resultingForm ?
              `1 ${props.form.type} = ${props.exactCurrency.toFixed(4)} ${props.convertType}`
              :
              `1 ${props.form.type} = ${(1 / props.exactCurrency).toFixed(4)} ${props.form.type}`
          }
        </div>
      }
    </div>
  );
}
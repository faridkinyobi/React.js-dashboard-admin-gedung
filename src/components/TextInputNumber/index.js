import React from "react";
import Input from "../TextInput/Index";
import { NumericFormat } from "react-number-format";
export default function index({
  name,
  value,
  label,
  onValueChange

}) {
  return (
    <div className="Form-input flex  flex-col  col-span-1 my-1 ">
      <label className="label text-xl text-blue-40">{label}</label>
      <NumericFormat
        customInput={Input}
        thousandSeparator={true}
        prefix={"Rp "}
        name={name}
        value={value}
        onValueChange={onValueChange}
      />
    </div>
  );
}

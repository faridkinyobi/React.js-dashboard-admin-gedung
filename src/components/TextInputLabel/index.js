import React from "react";
import Input from "../TextInput/Index";
export default function index({
  name,
  value,
  type,
  onChange,
  placeholder,
  label,
  className,
  min,
  maxLength,
  pattern
}) {
  return (
    <div className="Form-input flex  flex-col  col-span-1 my-1 ">
      <label className="label text-xl font-light text-white-10">{label}</label>
      <Input
        className={className}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        min={min}
        maxLength={maxLength}
        pattern={pattern}
      />
    </div>
  );
}

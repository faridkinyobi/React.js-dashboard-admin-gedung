import React from "react";

export default function Input({
  name,
  value,
  type,
  onChange,
  placeholder,
  children,
  className,
  min,
  maxLength,
  pattern,
}) {
  return (
    <input
      className={`rounded-lg focus:border-blue-20 focus:outline-none box-border border-2 border-gray-10 px-4 py-2 lg:w-96 my-2 md:mx-1 h-auto text-blue-40 ${className}`}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      min={min}
      maxLength={maxLength}
      pattern={pattern}
    >
      {children}
    </input>
  );
}

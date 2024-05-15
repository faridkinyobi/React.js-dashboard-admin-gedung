import React from "react";

export default function Button({
  title,
  onClick,
  type,
  loading,
  disabled,
  className,
}) {
  return (
    <button
      className={`${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {loading ? "Loading..." : title}
    </button>
  );
}

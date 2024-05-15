import React from "react";

export default function Link({
  role,
  roles,
  href,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
}) {
  const isHas = roles && Array.isArray(roles) && roles.indexOf(role); //1 / 0
  // console.log(isHas, "roles");
  // console.log(roles.indexOf(role));
  // console.log(Array.isArray(roles),"array roles")

  return (
    <>
      {isHas >= 0 && (
        <a
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`transition-all ease-in-out duration-700 ${className}`}
          href={href}
        >
          {children}
        </a>
      )}
    </>
  );
}

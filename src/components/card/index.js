import React from "react";

const InfoCard = ({ icon, number, title, className}) => {
  return (
    <div className={`w-[18rem] h-32  justify-items-center items-center flex rounded-lg shadow-md ${className}`}>
      {icon}
      <div className="text-left">
        <h4 className="my-1 font-extrabold">{title}</h4>
        <h1 className="text-lg font-medium">{number}</h1>
      </div>
    </div>
  );
};

export default InfoCard;

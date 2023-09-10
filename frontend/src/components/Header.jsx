import React from "react";

const Header = ({ title, subTitle }) => {
  return (
    <div className="mb-3 flex flex-col">
      <h1 className="text-white font-bold text-lg">{title}</h1>
      <p className="text-gray-400 font-normal text-sm">{subTitle}</p>
    </div>
  );
};

export default Header;

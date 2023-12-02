import React from "react";

const Option = ({ children, onClick }) => (
  <div className="option" onClick={onClick}>
    {children}
  </div>
);

export default Option;

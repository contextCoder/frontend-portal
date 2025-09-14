import React from "react";
import "./Spinner.css";

function Spinner({ size = 40, color = "#e70a0dff" }) {
  return (
    <div
      className="spinner"
      style={{ width: size, height: size, borderColor: `${color} transparent` }}
    ></div>
  );
}

export default Spinner;

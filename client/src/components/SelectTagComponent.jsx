import React from "react";
import { upperFirstLetter } from "../projects/document/utils/helper";

const SelectTagComponent = (props) => {
  return (
    <select {...props} style={style}>
      {Object.values(props.list).map((value, index) => (
        <option key={index} value={value}>
          {upperFirstLetter(value)}
        </option>
      ))}
    </select>
  );
};

export default SelectTagComponent;

const style = {
  margin:"5px",
  borderRadius:"8px",
  padding:"1px"
}
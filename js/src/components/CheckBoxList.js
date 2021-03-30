import React from "react";

export default function CheckBoxList({
  category,
  setCategory,
}) {
  return (
    <input
      styles="flexbox"
      type="checkbox"
      checked={category}
      onChange={(e) => {
        setCategory(e.target.checked);
      }}
    ></input>
  );
}

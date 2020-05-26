import React from "react";

function Colors(props) {
  return (
    <div style={{ backgroundColor: props.bgColor }}>
      Hello! {props.bgColor || "no color yet"}
    </div>
  );
}

module.exports = Colors;

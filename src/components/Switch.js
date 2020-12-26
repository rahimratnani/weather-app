import React from "react";
import "./Switch.css";

export default function Switch(props) {
  return (
    <section className="Switch">
      {/* <div className="toggle-button-cover"> */}
      {/* <div className="button-cover"> */}
      <div className="button r" id="button-1">
        <input
          onClick={props.handleUnitChange}
          type="checkbox"
          className="checkbox"
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </section>
  );
}

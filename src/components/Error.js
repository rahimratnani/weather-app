import React from "react";
import "./Error.css";

export default function Error(props) {
  const { code, text } = props.error;
  let errorText = "";
  if (code) {
    if (code === 404) {
      errorText = "No Results Found";
    } else {
      errorText = "Unknown Error Occurred";
    }
  } else {
    errorText = text;
  }
  return (
    <section className="Error">
      <p>{errorText}</p>
    </section>
  );
}

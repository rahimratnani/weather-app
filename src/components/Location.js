import React from "react";
import "./Location.css";

export default function Location(props) {
  const { country, city } = props;
  return (
    <section className="Location">
      <div>
        <p>
          {city}, {country}
        </p>
      </div>
      <div className="flag">
        <img
          src={`https://www.countryflags.io/${country}/flat/48.png`}
          alt="flag"
        />
      </div>
    </section>
  );
}

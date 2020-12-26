import React from "react";
import "./Weather.css";

export default function Weather(props) {
  return (
    <section className="Weather">
      <div className="weatherMain">
        <div className="weatherCondition">
          <p className="condition">Drizzle</p>
          <p className="day">Monday</p>
          <p className="date">Dec, 12</p>
        </div>
        <div className="weatherImg">
          <img
            src="http://openweathermap.org/img/wn/10d@2x.png"
            alt="weather icon"
          />
        </div>
      </div>
      {/* ================ */}
      <div className="temp">
        <p>
          10&deg;<span className="degree">C</span>
        </p>
      </div>
      {/* ================ */}
      <div className="description">
        <p>Feels Like 9&deg;C</p>
        <p>
          Clouds 10&#37; <span className="divider">&#8739;</span> Humidity
          81&#37;
        </p>
      </div>
    </section>
  );
}

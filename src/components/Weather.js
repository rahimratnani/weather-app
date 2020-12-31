import React from "react";
import "./Weather.css";

export default function Weather(props) {
  const {
    description,
    day,
    month,
    date,
    icon,
    tempC,
    tempF,
    feelsLikeC,
    feelsLikeF,
    humidity,
    clouds,
  } = props.weather;

  const { showCelsius } = props;

  return (
    <section className="Weather">
      <div className="weatherMain">
        <div className="weatherCondition">
          <p className="condition">{description}</p>
          <p className="day">{day}</p>
          <p className="date">
            {month}, {date}
          </p>
        </div>
        <div className="weatherImg">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      </div>
      {/* ================ */}
      <div className="temp">
        <p>
          {showCelsius ? tempC : tempF}&deg;
          <span className="degree">{showCelsius ? "C" : "F"}</span>
        </p>
      </div>
      {/* ================ */}
      <div className="description">
        <p>
          Feels Like {showCelsius ? feelsLikeC : feelsLikeF}&deg;
          {showCelsius ? "C" : "F"}
        </p>
        <div>
          <p>Clouds {clouds}&#37;</p>
          <span className="divider">&#8739;</span>
          <p>Humidity {humidity}&#37;</p>
        </div>
      </div>
    </section>
  );
}

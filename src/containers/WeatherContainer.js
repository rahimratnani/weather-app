import React from "react";
import Location from "../components/Location";
import Switch from "../components/Switch";
import Weather from "../components/Weather";

export default function WeatherContainer(props) {
  const { handleUnitChange, weather, showCelsius } = props;
  return (
    <React.Fragment>
      <Switch handleUnitChange={handleUnitChange} />
      <Location country={weather.country} city={weather.city} />
      <Weather weather={weather} showCelsius={showCelsius} />
    </React.Fragment>
  );
}

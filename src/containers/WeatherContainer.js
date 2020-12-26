import React from "react";
import Location from "../components/Location";
import Switch from "../components/Switch";
import Weather from "../components/Weather";

export default function WeatherContainer(props) {
  const { country, city, handleUnitChange } = props;
  return (
    <React.Fragment>
      <Location country={country} city={city} />
      <Switch handleUnitChange={handleUnitChange} />
      <Weather />
    </React.Fragment>
  );
}

import React from 'react';
import Location from './Location';
import Switch from './Switch';
import Weather from './Weather';
import { WeatherState } from './../types';

interface WeatherContainerProps {
  handleUnitChange: () => void;
  weather: WeatherState;
  showCelsius: boolean;
}

export default function WeatherContainer(props: WeatherContainerProps) {
  const { handleUnitChange, weather, showCelsius } = props;
  return (
    <React.Fragment>
      <Switch handleUnitChange={handleUnitChange} />
      <Location country={weather.country} city={weather.city} />
      <Weather weather={weather} showCelsius={showCelsius} />
    </React.Fragment>
  );
}

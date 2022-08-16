export interface WeatherData {
  weather: {
    main: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
  };
  name: string;
  dt: number;
}

export interface WeatherState {
  city: string;
  clouds: number;
  description: string;
  icon: string;
  tempC: number;
  tempF: number;
  feelsLikeC: number;
  feelsLikeF: number;
  humidity: number;
  country: string;
  date: number;
  day: string;
  month: string;
}

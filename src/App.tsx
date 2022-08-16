import React, { useEffect, useState } from 'react';
import Title from './components/Title';
import SearchBar from './components/SearchBar';
import WeatherContainer from './components/WeatherContainer';
import Error from './components/Error';
import './App.css';
import { WeatherData, WeatherState } from './types';

// celsius to fahrenheit converter
const getFahrenheit = (celsius: number) => {
  let f = celsius * (9 / 5) + 32;
  return Math.round(f);
};

const roundNumber = (num: number) => Math.round(Number(num));

// date conversion
const getDate = (unix_timestamp: number) => {
  const dt = new Date(unix_timestamp * 1000);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return {
    dt: dt.getDate(),
    day: days[dt.getDay()],
    month: months[dt.getMonth()],
  };
};

// filter relevent data
const filterData = (data: WeatherData) => ({
  description: data.weather[0].main,
  icon: data.weather[0].icon,
  tempC: roundNumber(data.main.temp),
  tempF: getFahrenheit(data.main.temp),
  feelsLikeC: roundNumber(data.main.feels_like),
  feelsLikeF: getFahrenheit(data.main.feels_like),
  humidity: data.main.humidity,
  clouds: data.clouds.all,
  country: data.sys.country,
  city: data.name,
  date: getDate(data.dt).dt,
  day: getDate(data.dt).day,
  month: getDate(data.dt).month,
});

function App() {
  // main weather object
  const [weather, setWeather] = useState<WeatherState>();
  // set it true when weather container mounts
  const [showWeather, setShowWeather] = useState(false);
  // search value
  const [input, setInput] = useState('');
  // if true, show temp in celisius, fahrenheit otherwise
  const [showCelsius, setShowCelsius] = useState(true);
  // store error
  const [error, setError] = useState<{ code: null | number; text: string }>({
    code: null,
    text: '',
  });

  interface Response {
    status: number;
    statusText: string;
  }

  const handleError = (response: Response) => {
    // set show weather to false first
    setShowWeather(false);
    // setErrorCode(response.status);
    setError({ code: response.status, text: '' });
    console.error(`Server responded with status text ${response.statusText}`);
  };

  const manageState = (data: WeatherState) => {
    setWeather(data);
  };

  // fetch by city
  const getWeatherByCity = async (city: string) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APPLICATION_ID}`;

    const response = await fetch(url, { mode: 'cors' }); // make request

    // if ok is false throw the response itself and reject the promise
    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    return filterData(data);
  };

  // fetch by location
  const getWeatherByGeoLoc = async (latitude: number, longitude: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_APPLICATION_ID}
    `;

    const response = await fetch(url, { mode: 'cors' }); // make request

    // if ok is false throw the response itself and reject the promise
    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    return filterData(data);
  };

  interface Position {
    coords: {
      latitude: number;
      longitude: number;
    };
  }

  // callded for success
  const geoLocSuccess = (position: Position) => {
    // set the error code to null
    setError({ code: null, text: '' });

    getWeatherByGeoLoc(position.coords.latitude, position.coords.longitude)
      .then((data: WeatherState) => {
        // pass the data to manage state
        manageState(data);

        // set the show weather to true if it's false
        if (!showWeather) setShowWeather(true);
      })
      // .catch error if any and pass the response to error handler
      .catch((response) => {
        handleError(response);
      });
  };

  // called for error
  const geoLocError = () => {
    // set show weather to false
    setShowWeather(false);
    setError({ code: null, text: 'Unable to retrieve your location.' });
  };

  // fetch by geolocation
  const getGeoLoc = () => {
    if ('geolocation' in navigator) {
      setError({ code: null, text: '' });
      navigator.geolocation.getCurrentPosition(geoLocSuccess, geoLocError);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const validateSearch = (input: string) => {
    if (input) return true;
    return false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // check if input value is empty, if it's then ask to input city name
    if (!validateSearch(input)) {
      // set show weather to false
      setShowWeather(false);
      // set error text to 'Please enter a city name.' and code to null
      setError({ code: null, text: 'Please Enter A City Name' });
      return;
    }

    // set the error code to null
    setError({ code: null, text: '' });

    // make the fetch request
    getWeatherByCity(input)
      .then((data: WeatherState) => {
        // pass the data to manage state
        manageState(data);

        // if show weather is false, set it true
        if (!showWeather) setShowWeather(true);
      })
      // .catch error if any and pass the response to error handler
      .catch((response) => {
        handleError(response);
      });
  };

  const handleUnitChange = () => {
    setShowCelsius((prevState) => (prevState ? false : true));
  };

  // set default weather when component mounts
  useEffect(() => {
    getWeatherByCity('delhi')
      .then((data: WeatherState) => {
        manageState(data);
        setShowWeather(true);
      })
      // catch the thrown response and execute error handling function
      .catch((response) => {
        handleError(response);
      });
  }, []);

  // ========== 888888888888888888 ================= //

  return (
    <div className="App">
      <Title />

      <SearchBar
        geoLoc={getGeoLoc}
        inputVal={input}
        handleInput={handleInput}
        handleSearch={handleSearch}
      />

      {showWeather ? (
        <WeatherContainer
          handleUnitChange={handleUnitChange}
          weather={weather!}
          showCelsius={showCelsius}
        />
      ) : null}

      {error.code || error.text ? <Error error={error} /> : null}
    </div>
  );
}

export default App;

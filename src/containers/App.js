import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
import "./App.css";
import WeatherContainer from "./WeatherContainer";

// celsius to fahrenheit converter
const getFahrenheit = (celsius) => {
  let f = celsius * (9 / 5) + 32;
  return Math.round(f);
};

const roundNumber = (num) => Math.round(Number(num));

// date conversion
const getDate = (unix_timestamp) => {
  const dt = new Date(unix_timestamp * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return {
    dt: dt.getDate(),
    day: days[dt.getDay()],
    month: months[dt.getMonth()],
  };
};

// filter relevent data
const filterData = (data) => {
  return {
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
  };
};

export default function App() {
  // ***** State ***** //

  const [weather, setWeather] = useState(); // main weather object
  // set it true when weather container mounts
  const [showWeather, setShowWeather] = useState(false);
  const [input, setInput] = useState(""); // search value
  // if true, show temp in celisius, fahrenheit otherwise
  const [showCelsius, setShowCelsius] = useState(true);
  const [error, setError] = useState({ code: null, text: "" }); // holds error

  // ***** Functions ***** //

  const handleError = (response) => {
    // set show weather to false first
    setShowWeather(false);
    // setErrorCode(response.status);
    setError({ code: response.status, text: "" });
    console.error(`Server responded with status text ${response.statusText}`);
  };

  const manageState = (data) => {
    setWeather(data);
  };

  // fetch by city
  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2542c4373dc0e41843d76539625f930b`;

    const response = await fetch(url, { mode: "cors" }); // make request

    // if ok is false throw the response itself and reject the promise
    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    return filterData(data);
  };

  // fetch by location
  const getWeatherByGeoLoc = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=2542c4373dc0e41843d76539625f930b
    `;

    const response = await fetch(url, { mode: "cors" }); // make request

    // if ok is false throw the response itself and reject the promise
    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    return filterData(data);
  };

  // callded for success
  const geoLocSuccess = (position) => {
    // set the error code to null
    setError({ code: null, text: "" });

    getWeatherByGeoLoc(position.coords.latitude, position.coords.longitude)
      .then((data) => {
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
    setError({ code: null, text: "Unable to retrieve your location." });
  };

  // fetch by geolocation
  const getGeoLoc = () => {
    if ("geolocation" in navigator) {
      setError({ code: null, text: "" });
      navigator.geolocation.getCurrentPosition(geoLocSuccess, geoLocError);
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const validateSearch = (input) => {
    if (input) return true;
    return false;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // check if input value is empty, if it's then ask to input city name
    if (!validateSearch(input)) {
      // set show weather to false
      setShowWeather(false);
      // set error text to 'Please enter a city name.' and code to null
      setError({ code: null, text: "Please Enter A City Name" });
      return;
    }

    // set the error code to null
    setError({ code: null, text: "" });

    // make the fetch request
    getWeatherByCity(input)
      .then((data) => {
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

  const handleUnitChange = (e) => {
    setShowCelsius((prevState) => (prevState ? false : true));
  };

  // ***** Side Effects ***** //

  // set default weather when component mounts
  useEffect(() => {
    getWeatherByCity("delhi")
      .then((data) => {
        manageState(data);
        setShowWeather(true);
      })
      // catch the thrown response and execute error handling function
      .catch((response) => {
        handleError(response);
      });
  }, []);

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
          weather={weather}
          showCelsius={showCelsius}
        />
      ) : null}
      {error.code || error.text ? <Error error={error} /> : null}
    </div>
  );
}

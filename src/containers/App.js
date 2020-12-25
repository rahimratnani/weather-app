import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
import "./App.css";

// celsius to fahrenheit converter
const getFahrenheit = (celsius) => {
  let f = celsius * (9 / 5) + 32;
  return Math.round(f * 10) / 10;
};

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
    tempC: data.main.temp,
    tempF: getFahrenheit(data.main.temp),
    feelsLikeC: data.main.feels_like,
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
  const [country, setCountry] = useState(""); // country code
  const [input, setInput] = useState(""); // search value
  const [errorCode, setErrorCode] = useState(null); // holds error code
  const [errorText];

  // ***** Functions ***** //

  // fetch by city
  const getWeatherByCity = async (city) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2542c4373dc0e41843d76539625f930b`;

    const response = await fetch(url, { mode: "cors" }); // make request
    // if ok is false throw the response itself and reject the promise
    if (!response.ok) {
      throw response;
    }
    const data = await response.json();
    return filterData(data);
  };

  // fetch by geolocation
  const getWeatherByGeoLoc = () => {
    if ("geolocation" in navigator) {
      // first set errorCode to null and error text to ''
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(
          `latitude is ${position.coords.latitude} and longitude is ${position.coords.longitude}`
        );
      });
    }
  };

  const manageState = (data) => {
    setWeather(data);
    setCountry(data.country);
  };

  const handleError = (response) => {
    setErrorCode(response.status);
    console.error(`Server responded with status text ${response.statusText}`);
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
      console.log(`Please enter a city.`);
      return;
    }

    // set the error code to null
    setErrorCode(null);
    // set errorText to ''

    // make the fetch request
    getWeatherByCity(input)
      .then((data) => {
        // pass the data to manage state
        manageState(data);
      })
      // .catch error if any and pass the response to error handler
      .catch((response) => {
        handleError(response);
      });
  };

  // Efects
  // useEffect(() => {
  //   getWeatherByCity("talajaaa").then(console.log);
  // });

  // ***** Side Effects ***** //

  // set default weather when component mounts
  useEffect(() => {
    getWeatherByCity("delhi")
      .then((data) => {
        manageState(data);
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
        geoLoc={getWeatherByGeoLoc}
        inputVal={input}
        handleInput={handleInput}
        handleSearch={handleSearch}
      />
    </div>
  );
}

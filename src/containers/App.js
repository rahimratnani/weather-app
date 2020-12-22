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
  //state
  const [weather, setWeather] = useState(); // main weather object
  const [country, setCountry] = useState(""); // country code
  const [input, setInput] = useState(""); // search value
  // fetch by city
  const getWeatherByCity = async (city) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2542c4373dc0e41843d76539625f930b`;
    try {
      const response = await fetch(url, { mode: "cors" });
      const data = await response.json();
      return filterData(data);
    } catch (err) {
      console.error(err);
      // execute fallback function or handle error
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // handle further search and fetching
  };

  // Efects
  // useEffect(() => {
  //   getWeatherByCity("talajaaa").then(console.log);
  // });

  // set default weather when component mounts
  useEffect(() => {
    getWeatherByCity("delhi").then((data) => {
      setWeather(data);
      setCountry(data.country);
    });
  }, []);
  return (
    <div className="App">
      <Title />
      <SearchBar
        inputVal={input}
        handleInput={handleInput}
        handleSearch={handleSearch}
      />
    </div>
  );
}

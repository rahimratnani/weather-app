import React from "react";
import "./SearchBar.css";

export default function SearchBar(props) {
  const { handleInput, handleSearch, inputVal, geoLoc } = props;
  return (
    <section className="Search">
      <div className="searchBox">
        <button onClick={geoLoc} className="location" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            // stroke="#97C5F3"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-map-pin"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </button>
        <form>
          <input
            onChange={handleInput}
            type="text"
            placeholder="Enter City Name"
            name="search"
            value={inputVal}
          />
          <button onClick={handleSearch} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60a6ee"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}

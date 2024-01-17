import React, { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

const { dataContainer, searchBar, iconStyle,temp } = styles;

function Weather() {
  const [inputValue, setInputValue] = useState("");

  const [uiWeatherData, setUiWeatherData] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setUiWeatherData(null)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted" + inputValue);
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=d7abad499b7b468891a91641221601&q=${inputValue}&days=3&aqi=no&alerts=no`
        );
        const showData = response.data;
        setUiWeatherData({
          region: showData.location.name,
          temp: showData.current.temp_c,
          icon: "https:" + (showData.current.condition.icon).replace("64x64","128x128"),
          wind: showData.current.wind_kph + "KM/h",
          humidity: showData.current.humidity + "%",
          condition: showData.current.condition.text,
        });


        console.log(showData, "data");
      } catch (error) {
        console.error("Error fetching data:", error);
        setUiWeatherData(null)
      }
    };
    getData();
  };

  return (
    <>
    <div className="d-flex flex-column w-100 align-items-center   vh-100  ">
     <h1 className="mt-3 ">Weather Forecast</h1>
      <div
        className={`${dataContainer} w-100 mt-4 pb-4 d-flex flex-column align-items-center justify-content-center   rounded`}
      >
       
        <div className="search my-4 ">
          <form onSubmit={handleSubmit} className={searchBar}>
            {/* <input type="text" value={inputValue} onChange={handleChange} />
            <button type="submit " className="px-2">
              {" "}
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button> */}
            <input
              type="search"
              required
              value={inputValue}
              onChange={handleChange}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} className={iconStyle} />
            </button>
          </form>
        </div>
        {uiWeatherData ? (
          <div className="content mt-5  w-100 d-flex justify-content-center align-items-center ">

            <div className="cityAndTemp  w-25 ">
              <div className="cityTemp">
                <span className={`${temp} ms-2`}>
                  {uiWeatherData.temp}&deg;C
                </span>
                <div className="weatherCondition">
                  {uiWeatherData.condition}
                 

                </div>
                <div className="city">
                {uiWeatherData.region ? uiWeatherData.region : "loading..."}
                </div>
              </div>
              <div className="restOfData">
               
                <div className="humidity">
                  Humidity: {uiWeatherData.humidity}{" "}
                </div>
                <div className="wind">Wind Speed: {uiWeatherData.wind} </div>
              </div>
            </div>


            <div className="restOfTempData  w-25 ">
              <div className="img">
              <img src={uiWeatherData.icon}  style={{width:'200px'}} alt="wather icon" />

              </div>
              
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      </div>
    </>
  );
}

export default Weather;

import React, { useEffect } from "react";
import { useState } from "react";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [locname, setLocname] = useState("");
  const [dat, setdat] = useState("");

  const hand = (e) => {
    setdat(e.target.value);
  };

  const sub = () => {
    setLocname(dat);
  };
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        location: data.name,
      });
    } catch (error) {}
  };
  useEffect(() => {
    search(locname);
  }, [locname]);
  return (
    <div className="place-self-center mt-40 bg-[#00aeff] rounded-2xl w-100 h-100 flex flex-col jus">
      <h1 className="flex justify-center p-5 font-bold text-black">
        Weather App
      </h1>
      <div className="flex justify-center ml-5">
        <input
          className="text-black border-1 rounded-2xl px-2 border-black"
          type="text"
          placeholder="Search"
          onChange={hand}
          
        ></input>
        <img className="pl-3" onClick={sub} src={search_icon} alt=""></img>
      </div>
      <div className="flex flex-col items-center">
        <img src={clear_icon} className="w-2/5 " alt="" />
        <h1>{weatherData.humidity}</h1>
        <p>{weatherData.location}</p>
      </div>
    </div>
  );
};

export default WeatherApp;

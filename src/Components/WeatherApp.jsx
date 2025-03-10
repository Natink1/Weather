import React, { useEffect } from "react";
import { useState } from "react";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import cloud_icon from "../Assets/cloud.png";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [locname, setLocname] = useState("");
  const [dat, setdat] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const hand = (e) => {
    setdat(e.target.value);
  };

  const sub = () => {
    setLocname(dat);
  };
  const search = async (city) => {
    https: try {
      const url = `//api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || cloud_icon;

      console.log(data);

      setWeatherData({
        temprature: data.main.temp,
        city: data.name,
        ico: icon,
      });
    } catch (error) {}
  };
  useEffect(() => {
    search(locname);
  }, [locname]);
  return (
    <div className="place-self-center mt-40 bg-[#00aeff] rounded-2xl w-100 h-100 flex flex-col ">
      <h1 className="flex justify-center p-5 text-2xl font-bold text-black">
        Weather App
      </h1>
      <div className="flex justify-center ml-5">
        <input
          className="text-black border-1 rounded-lg px-2 border-black"
          type="text"
          placeholder="Search"
          onChange={hand}
        ></input>
        <img className="pl-3" onClick={sub} src={search_icon} alt=""></img>
      </div>
      <div className="flex flex-col items-center">
        <img src={weatherData.ico} className="w-2/5 " alt="" />
        <h1>{weatherData.temprature}°c</h1>
        <p>{weatherData.city}</p>
      </div>
    </div>
  );
};

export default WeatherApp;

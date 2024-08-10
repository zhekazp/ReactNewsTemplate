import { useEffect, useState } from "react";
import { WeatherMP } from "../../mainPage";
import Spinner from "../spinner/Spinner";
import React from "react";
import { days, month } from "../../mainPage";

const Weather = (props: { weather: WeatherMP | null; loading: boolean }) => {
  const date = new Date();
  return (
    <div className="wMainblock">
      {props.weather === null ? (
        <>
          {props.loading ? (
            <Spinner show={props.loading} color="white" />
          ) : (
            <p>Weather unavailable</p>
          )}
        </>
      ) : (
        <div className="container">
          <div className="wBlock">
            <div className="wSmallBlock">
              <h4>{props.weather.city}</h4>
              <span>
                {days[date.getDay()] +
                  " " +
                  date.getDate() +
                  " " +
                  month[date.getMonth()]}
              </span>
            </div>
            <div className="wSmallBlock">
              <h2>{props.weather.temp + " C"}</h2>
              <span>{props.weather.max + " / " + props.weather.min}</span>
              <br />
            </div>
            <div className="wSmallBlock">
              <img
                src={
                  "http://openweathermap.org/img/w/" +
                  props.weather.ico +
                  ".png"
                }
                alt="weather ico"
              />
            </div>
          </div>
          <div className="wInfo">
            <span>{props.weather.description}</span>
            <br />
<<<<<<< HEAD
            <span>{"Wind: " + props.weather.wind}</span>
=======
            <span>{"Wind: " + props.weather.wind+" м/s"}</span>
>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db
            <br />
            <span>{"Feuchtigkeit: " + props.weather.humidity + "%"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

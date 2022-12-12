import React from 'react';

const Weather = (props) => {

  /* чтобы эти данные выводились только при их наличии */
  return (
    <div>
      {props.city &&
        <div className='infoWeather'>
          <p>Location: {props.city}, {props.country}</p>
          <p>temperature: {props.temp}°C</p>
          <p>pressure: {props.pressure}</p>
          <p>wind speed: {props.wind}m/s</p>
          <p>sunset: {props.sunset}</p>
        </div>
      }
      <p className='error'>{props.error}</p>
    </div>
  );
}


export { Weather };

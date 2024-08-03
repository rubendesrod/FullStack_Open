import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCountry = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://wttr.in/${country.name.common}?format=j1`);
        setWeather(response.data);
      } catch (e) {
        console.log('e')
      }
    };

    fetchWeather();
  }, [country.name.common]);

  // Obtener un array de claves valor porque es un objeto y no un array
  const languages = Object.entries(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width="250"
        border="2px"
      />
      <h3>Weather:</h3>
      {weather && (
        <div className='weather'>
          <p>Temperatura: {weather.current_condition[0].temp_C} °C</p>
          <p>Humedad: {weather.current_condition[0].humidity} %</p>
          <p>Condición: {weather.current_condition[0].weatherDesc[0].value}</p>
          <p>Velocidad del viento: {weather.current_condition[0].windspeedKmph} km/h</p>
          <img 
            src={`https://wttr.in/${country.name.common}.png`} 
            alt={`Clima en ${country.name.common}`} 
            width="250px" 
            border="2px" 
          />
        </div>
      )}
    </div>
  );
};

export default ViewCountry;

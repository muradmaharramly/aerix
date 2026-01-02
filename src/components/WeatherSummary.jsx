import React from 'react';
import { useSelector } from 'react-redux';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherUtils';
import Earth3D from './Earth3D';

const WeatherSummary = () => {
  const { current, locationCoords } = useSelector((state) => state.weather);
  const { city } = useSelector((state) => state.location);
  const { units } = useSelector((state) => state.ui);

  if (!current) return null;

  const values = current.data.values;
  const temperature = Math.round(values.temperature);
  const weatherCode = values.weatherCode;

  // Convert if needed (API returns metric by default as requested)
  const displayTemp = units === 'metric' ? temperature : Math.round((temperature * 9/5) + 32);
  const tempUnit = units === 'metric' ? '°C' : '°F';

  // Map logic
  const renderMap = () => {
    // Return Earth3D even if coords aren't loaded yet (it handles null coords gracefully)
    // But logically we want to show it when we have a location or just always show the globe?
    // Always showing the globe is better UI.
    return (
      <div className="weather-summary-map-container">
        <Earth3D />
      </div>
    );
  };

  return (
    <div className="weather-summary card fade-in">
      <div className="weather-summary-content">
        <div className="weather-summary__header">
          <h2>{city}</h2>
          <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div className="weather-summary__main">
          <div className="weather-icon">
            {getWeatherIcon(weatherCode)}
          </div>
          <div className="temperature">
            <h1>{displayTemp}{tempUnit}</h1>
            <p>{getWeatherDescription(weatherCode)}</p>
          </div>
        </div>
      </div>
      
      {renderMap()}
    </div>
  );
};

export default WeatherSummary;

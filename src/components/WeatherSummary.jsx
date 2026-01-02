import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherUtils';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';

// Lazy load Earth3D to prevent bundle issues and show loading state
const Earth3D = React.lazy(() => import('./Earth3D'));

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
    return (
      <div className="weather-summary-map-container">
        <Suspense fallback={<div className="map-loading">Loading Globe...</div>}>
          <Earth3D />
        </Suspense>
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

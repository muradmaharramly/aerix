import React from 'react';
import { useSelector } from 'react-redux';
import { getWeatherIcon } from '../utils/weatherUtils';

const HourlyForecast = () => {
  const { hourly } = useSelector((state) => state.weather);
  const { units } = useSelector((state) => state.ui);

  if (!hourly || hourly.length === 0) return null;

  // Take next 24 items (hours)
  const next24Hours = hourly.slice(0, 25); // Include current hour + 24

  return (
    <div className="hourly-forecast section fade-in">
      <h3 className="section-title">Hourly Forecast</h3>
      <div className="hourly-list">
        {next24Hours.map((hour, index) => {
          const date = new Date(hour.time);
          const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const temp = Math.round(hour.values.temperature);
          const displayTemp = units === 'metric' ? temp : Math.round((temp * 9/5) + 32);

          return (
            <div key={index} className="hourly-card glass-panel">
              <span className="time">{index === 0 ? 'Now' : timeString}</span>
              <div className="icon">
                {getWeatherIcon(hour.values.weatherCode)}
              </div>
              <span className="temp">{displayTemp}°</span>
              <div className="precipitation">
                {/* Optional: Show precip chance if > 0 */}
                {hour.values.precipitationProbability > 0 && (
                   <span className="precip-chance">{hour.values.precipitationProbability}%</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;

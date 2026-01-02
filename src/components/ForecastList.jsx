import React from 'react';
import { useSelector } from 'react-redux';
import { getWeatherIcon } from '../utils/weatherUtils';

const ForecastList = () => {
  const { forecast } = useSelector((state) => state.weather);
  const { units, filter } = useSelector((state) => state.ui);

  if (!forecast || forecast.length === 0) return null;

  // Limit to 7 days for weekly forecast
  const weeklyForecast = forecast.slice(0, 7);

  const filteredForecast = weeklyForecast.filter(day => {
    if (filter.weatherType === 'all') return true;
    
    const code = day.values.weatherCodeMax;
    // Simple mapping logic
    const isSunny = [1000, 1100, 1101].includes(code);
    const isCloudy = [1102, 1001, 2000, 2100].includes(code);
    const isRainy = [4000, 4001, 4200, 4201, 8000].includes(code);
    const isSnowy = [5000, 5001, 5100, 5101, 6000, 6001, 6200, 6201, 7000, 7101, 7102].includes(code);

    if (filter.weatherType === 'sunny' && isSunny) return true;
    if (filter.weatherType === 'cloudy' && isCloudy) return true;
    if (filter.weatherType === 'rainy' && isRainy) return true;
    if (filter.weatherType === 'snowy' && isSnowy) return true;
    
    return false;
  }).filter(day => {
    if (filter.tempRange === 'all') return true;

    // Use max temp for filtering range
    const temp = day.values.temperatureMax;

    if (filter.tempRange === 'freezing' && temp < 0) return true;
    if (filter.tempRange === 'cold' && temp >= 0 && temp < 10) return true;
    if (filter.tempRange === 'mild' && temp >= 10 && temp < 20) return true;
    if (filter.tempRange === 'warm' && temp >= 20 && temp < 30) return true;
    if (filter.tempRange === 'hot' && temp >= 30) return true;

    return false;
  });

  return (
    <div className="forecast-list-container fade-in" style={{ marginTop: '2rem' }}>
      <h3 className="section-title">Weekly Forecast {filteredForecast.length < 7 && `(${filteredForecast.length} days matching)`}</h3>
      <div className="forecast-list">
        {filteredForecast.map((day, index) => {
          const date = new Date(day.time);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const tempMax = Math.round(day.values.temperatureMax);
          const tempMin = Math.round(day.values.temperatureMin);
          const weatherCode = day.values.weatherCodeMax;

          const displayMax = units === 'metric' ? tempMax : Math.round((tempMax * 9/5) + 32);
          const displayMin = units === 'metric' ? tempMin : Math.round((tempMin * 9/5) + 32);

          return (
            <div key={index} className="forecast-card card">
              <p className="day-name">{dayName}</p>
              <div className="forecast-icon">
                {getWeatherIcon(weatherCode)}
              </div>
              <div className="forecast-temps">
                <span className="max">{displayMax}°</span>
                <span className="min">{displayMin}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastList;

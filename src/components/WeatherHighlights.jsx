import React from 'react';
import { useSelector } from 'react-redux';
import { 
  WiDaySunny, 
  WiStrongWind, 
  WiHumidity, 
  WiBarometer, 
  WiSunrise, 
  WiSunset, 
  WiThermometer,
  WiDust
} from 'react-icons/wi';

const WeatherHighlights = () => {
  const { current } = useSelector((state) => state.weather);
  const { units } = useSelector((state) => state.ui);

  if (!current) return null;

  const values = current.data.values;
  const { 
    uvIndex, 
    windSpeed, 
    humidity, 
    visibility, 
    pressureSurfaceLevel: pressure,
    temperatureApparent,
    sunriseTime,
    sunsetTime
  } = values;

  // Unit Conversions
  const displayFeelsLike = units === 'metric' ? Math.round(temperatureApparent) : Math.round((temperatureApparent * 9/5) + 32);
  const displaySpeed = units === 'metric' ? windSpeed : Math.round(windSpeed * 2.237);
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';
  const displayVisibility = units === 'metric' ? visibility : Math.round(visibility * 0.621371);
  const visibilityUnit = units === 'metric' ? 'km' : 'mi';
  
  // Helpers
  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getUVDescription = (uv) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  const getVisibilityDescription = (vis) => {
    // Assuming km
    if (vis > 10) return 'Perfect';
    if (vis > 5) return 'Good';
    if (vis > 2) return 'Average';
    return 'Poor';
  };

  return (
    <div className="weather-highlights fade-in" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>Today's Highlights</h3>
      
      <div className="highlights-grid">
        
        {/* UV Index */}
        <div className="highlight-card card">
          <div className="highlight-header">
            <span>UV Index</span>
            <WiDaySunny className="highlight-icon" />
          </div>
          <div className="highlight-value">
            <h2>{uvIndex || 0}</h2>
            <p>{getUVDescription(uvIndex || 0)}</p>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${Math.min((uvIndex / 11) * 100, 100)}%` }}></div>
          </div>
        </div>

        {/* Wind Status */}
        <div className="highlight-card card">
          <div className="highlight-header">
            <span>Wind Status</span>
            <WiStrongWind className="highlight-icon" />
          </div>
          <div className="highlight-value">
            <h2>{displaySpeed} <span className="unit">{speedUnit}</span></h2>
          </div>
          <div className="wind-direction">
             {/* Visual direction could go here if we had degrees */}
             <p>Wind is blowing</p>
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="highlight-card card">
          <div className="highlight-header">
            <span>Sunrise & Sunset</span>
            <WiSunrise className="highlight-icon" />
          </div>
          <div className="sun-times">
            <div className="sun-item">
              <WiSunrise className="sun-icon up" />
              <div>
                <p>Sunrise</p>
                <h4>{formatTime(sunriseTime)}</h4>
              </div>
            </div>
            <div className="sun-item">
              <WiSunset className="sun-icon down" />
              <div>
                <p>Sunset</p>
                <h4>{formatTime(sunsetTime)}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="highlight-card card">
          <div className="highlight-header">
            <span>Humidity</span>
            <WiHumidity className="highlight-icon" />
          </div>
          <div className="highlight-value">
            <h2>{humidity}%</h2>
            <p>{humidity > 60 ? 'High' : humidity < 30 ? 'Low' : 'Normal'}</p>
          </div>
          <div className="progress-bar-container">
             <div className="progress-bar" style={{ width: `${humidity}%` }}></div>
          </div>
        </div>

        {/* Visibility */}
        <div className="highlight-card card">
          <div className="highlight-header">
            <span>Visibility</span>
            <WiDust className="highlight-icon" />
          </div>
          <div className="highlight-value">
            <h2>{displayVisibility} <span className="unit">{visibilityUnit}</span></h2>
            <p>{getVisibilityDescription(displayVisibility)}</p>
          </div>
        </div>

        {/* Feels Like */}
        <div className="highlight-card card">
          <div className="highlight-header">
            <span>Feels Like</span>
            <WiThermometer className="highlight-icon" />
          </div>
          <div className="highlight-value">
            <h2>{displayFeelsLike}°</h2>
            <p>{displayFeelsLike > 25 ? 'Warmer' : 'Colder'} than actual</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherHighlights;

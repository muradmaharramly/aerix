import React from 'react';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiCloud,
  WiFog,
  WiRain,
  WiShowers,
  WiSnow,
  WiThunderstorm,
  WiRainMix,
} from 'react-icons/wi';

export const getWeatherIcon = (code) => {
  // Visual Crossing Strings
  if (typeof code === 'string') {
    switch (code.toLowerCase()) {
      case 'clear-day':
      case 'clear-night':
        return <WiDaySunny />;
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
        return <WiDayCloudy />;
      case 'cloudy':
        return <WiCloud />;
      case 'fog':
      case 'wind':
        return <WiFog />;
      case 'rain':
      case 'showers-day':
      case 'showers-night':
        return <WiRain />;
      case 'snow':
      case 'snow-showers-day':
      case 'snow-showers-night':
        return <WiSnow />;
      case 'thunder-rain':
      case 'thunder-showers-day':
      case 'thunder-showers-night':
        return <WiThunderstorm />;
      default:
        return <WiDaySunny />;
    }
  }

  // Tomorrow.io Codes
  switch (code) {
    case 1000: // Clear, Sunny
      return <WiDaySunny />;
    case 1100: // Mostly Clear
    case 1101: // Partly Cloudy
      return <WiDayCloudy />;
    case 1102: // Mostly Cloudy
    case 1001: // Cloudy
      return <WiCloud />;
    case 2000: // Fog
    case 2100: // Light Fog
      return <WiFog />;
    case 4000: // Drizzle
    case 4200: // Light Rain
      return <WiShowers />;
    case 4001: // Rain
    case 4201: // Heavy Rain
      return <WiRain />;
    case 5000: // Snow
    case 5001: // Flurries
    case 5100: // Light Snow
    case 5101: // Heavy Snow
      return <WiSnow />;
    case 8000: // Thunderstorm
      return <WiThunderstorm />;
    default:
      return <WiDaySunny />;
  }
};

export const getWeatherDescription = (code) => {
  const codes = {
    1000: 'Clear, Sunny',
    1100: 'Mostly Clear',
    1101: 'Partly Cloudy',
    1102: 'Mostly Cloudy',
    1001: 'Cloudy',
    2000: 'Fog',
    2100: 'Light Fog',
    4000: 'Drizzle',
    4001: 'Rain',
    4200: 'Light Rain',
    4201: 'Heavy Rain',
    5000: 'Snow',
    5001: 'Flurries',
    5100: 'Light Snow',
    5101: 'Heavy Snow',
    6000: 'Freezing Drizzle',
    6001: 'Freezing Rain',
    6200: 'Light Freezing Rain',
    6201: 'Heavy Freezing Rain',
    7000: 'Ice Pellets',
    7101: 'Heavy Ice Pellets',
    7102: 'Light Ice Pellets',
    8000: 'Thunderstorm',
  };
  return codes[code] || 'Unknown';
};

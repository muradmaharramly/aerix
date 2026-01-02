export const getBackgroundGradient = (weatherCode) => {
  if (!weatherCode) return 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)';

  // Clear / Sunny (1000: Clear, 1100: Mostly Clear)
  if ([1000, 1100].includes(weatherCode)) {
    // Bright Green to Lime
    return 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)';
  }

  // Cloudy (1101: Partly Cloudy, 1102: Mostly Cloudy, 1001: Cloudy)
  if ([1101, 1102, 1001].includes(weatherCode)) {
    // Muted Sage / Grey-Green
    return 'linear-gradient(135deg, #616161 0%, #9bc5c3 100%)';
  }

  // Rain (4000: Drizzle, 4001: Rain, 4200: Light Rain, 4201: Heavy Rain)
  if ([4000, 4001, 4200, 4201].includes(weatherCode)) {
    // Deep Forest Green / Teal
    return 'linear-gradient(135deg, #093028 0%, #237A57 100%)';
  }

  // Snow (5000+, 6000+, 7000+)
  if ([5000, 5001, 5100, 5101, 6000, 6001, 6200, 6201, 7000, 7101, 7102].includes(weatherCode)) {
    // Mint / Ice Green
    return 'linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)';
  }

  // Thunderstorm (8000)
  if ([8000].includes(weatherCode)) {
    // Dark Emerald / Stormy Green
    return 'linear-gradient(135deg, #000000 0%, #0f9b0f 100%)';
  }
  
  // Default (Deep Teal to Soft Green)
  return 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)';
};

import axios from 'axios';

const API_KEY = import.meta.env.VITE_VISUAL_CROSSING_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchWeatherForecast = async (location) => {
  try {
    // Visual Crossing API request
    const response = await api.get(`/${location}`, {
      params: {
        key: API_KEY,
        unitGroup: 'metric',
        include: 'days,hours,current',
        contentType: 'json'
      },
    });

    const data = response.data;

    // Transform Visual Crossing data to match Tomorrow.io structure
    // This allows us to keep the rest of the application logic (reducers, components) unchanged.
    
    // 1. Map Hourly Data (from the first day and potentially next 24h)
    // VC provides hourly data nested within days. We'll flatten the first 2 days' hours.
    let hourly = [];
    if (data.days && data.days.length > 0) {
      // Get hours from today and tomorrow to cover enough future time
      const todayHours = data.days[0].hours.map(h => ({
         time: `${data.days[0].datetime}T${h.datetime}`,
         values: mapVcToTomorrow(h)
      }));
      
      let tomorrowHours = [];
      if (data.days.length > 1) {
        tomorrowHours = data.days[1].hours.map(h => ({
          time: `${data.days[1].datetime}T${h.datetime}`,
          values: mapVcToTomorrow(h)
        }));
      }
      
      hourly = [...todayHours, ...tomorrowHours];
      
      // Filter out past hours if necessary, but for now just returning all is fine
      // Actually, let's try to filter to start from "now"
      const currentEpoch = new Date().getTime();
      hourly = hourly.filter(h => new Date(h.time).getTime() >= currentEpoch - 3600000); // Keep last hour
    }

    // 2. Map Daily Data
    const daily = data.days.map(d => ({
      time: d.datetime,
      values: {
        ...mapVcToTomorrow(d),
        temperatureMax: d.tempmax,
        temperatureMin: d.tempmin,
        weatherCodeMax: d.icon, // VC doesn't have min/max codes, just daily icon
      }
    }));

    // 3. Inject Current Conditions as the very first "hourly" point for immediate display accuracy
    if (data.currentConditions) {
      const current = {
        time: new Date().toISOString(),
        values: mapVcToTomorrow(data.currentConditions)
      };
      // Prepend current conditions
      hourly.unshift(current);
    }

    return {
      timelines: {
        hourly: hourly,
        daily: daily
      },
      location: {
        name: data.address,
        lat: data.latitude,
        lon: data.longitude
      }
    };

  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Helper to map Visual Crossing fields to Tomorrow.io field names
const mapVcToTomorrow = (vcData) => {
  return {
    temperature: vcData.temp,
    temperatureApparent: vcData.feelslike,
    humidity: vcData.humidity,
    windSpeed: vcData.windspeed,
    weatherCode: vcData.icon, // Passing string directly, handled by weatherUtils
    precipitationProbability: vcData.precipprob,
    uvIndex: vcData.uvindex,
    pressureSurfaceLevel: vcData.pressure,
    visibility: vcData.visibility,
    cloudCover: vcData.cloudcover,
    sunriseTime: vcData.sunriseEpoch ? new Date(vcData.sunriseEpoch * 1000).toISOString() : null,
    sunsetTime: vcData.sunsetEpoch ? new Date(vcData.sunsetEpoch * 1000).toISOString() : null,
  };
};

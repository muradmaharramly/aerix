// Mock city list for autocomplete (Tomorrow.io doesn't have a free city autocomplete endpoint easily accessible without specific setup)
// In a real production app, this would call a Geocoding API (like Google Places or OpenWeatherMap Geocoding)
const CITIES = [
  "New York, USA", "London, UK", "Paris, France", "Tokyo, Japan", "Sydney, Australia",
  "Berlin, Germany", "Moscow, Russia", "Toronto, Canada", "Dubai, UAE", "Singapore",
  "Barcelona, Spain", "Rome, Italy", "Los Angeles, USA", "Chicago, USA", "San Francisco, USA",
  "Miami, USA", "Vancouver, Canada", "Mumbai, India", "Beijing, China", "Shanghai, China",
  "Bangkok, Thailand", "Seoul, South Korea", "Istanbul, Turkey", "Rio de Janeiro, Brazil",
  "Buenos Aires, Argentina", "Cairo, Egypt", "Lagos, Nigeria", "Nairobi, Kenya", "Cape Town, South Africa",
  "Mexico City, Mexico", "Madrid, Spain", "Amsterdam, Netherlands", "Vienna, Austria", "Zurich, Switzerland",
  "Stockholm, Sweden", "Oslo, Norway", "Copenhagen, Denmark", "Helsinki, Finland", "Dublin, Ireland",
  "Brussels, Belgium", "Lisbon, Portugal", "Athens, Greece", "Prague, Czech Republic", "Budapest, Hungary",
  "Warsaw, Poland", "Boston, USA", "Seattle, USA", "Austin, USA", "Denver, USA", "Las Vegas, USA",
  "Baku, Azerbaijan", "Baku"
];

export const searchCities = async (query) => {
  // Simulating an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }
      const lowerQuery = query.toLowerCase();
      const matches = CITIES.filter(city => city.toLowerCase().includes(lowerQuery));
      resolve(matches);
    }, 200);
  });
};

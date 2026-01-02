import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from 'react-spinners';
import { fetchWeatherData } from './store/weatherSlice';
import { clearError } from './store/uiSlice';
import { getBackgroundGradient } from './utils/backgroundUtils';
import CitySearch from './components/CitySearch';
import WeatherSummary from './components/WeatherSummary';
import HourlyForecast from './components/HourlyForecast';
import WeatherHighlights from './components/WeatherHighlights';
import WeatherChart from './components/WeatherChart';
import ForecastList from './components/ForecastList';
import FilterBar from './components/FilterBar';
import UnitToggle from './components/UnitToggle';
import logo from './assets/images/aerix-logo.png';

function App() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.ui);
  const { city } = useSelector((state) => state.location);
  const { current } = useSelector((state) => state.weather);

  useEffect(() => {
    // Initial fetch
    dispatch(fetchWeatherData(city));
  }, []); // Run once on mount for default city

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Update background based on weather
  useEffect(() => {
    if (current) {
      const weatherCode = current.data.values.weatherCode;
      const gradient = getBackgroundGradient(weatherCode);
      document.body.style.background = gradient;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
    }
  }, [current]);

  return (
    <div className="container">
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
          <img src={logo} alt="Aerix" style={{ height: '70px', objectFit: 'contain' }} />
          <UnitToggle />
        </div>
      </header>

      <main>
        <FilterBar />
        
        {isLoading ? (
          <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <PulseLoader color="#ffffff" size={15} />
          </div>
        ) : (
          <>
            <WeatherSummary />
            <HourlyForecast />
            <ForecastList />
            <WeatherHighlights />
            <WeatherChart />
          </>
        )}
      </main>

      <ToastContainer 
        position="bottom-right"
        theme="dark"
        toastStyle={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', color: '#fff' }}
      />
    </div>
  );
}

export default App;

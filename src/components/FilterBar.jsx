import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnits, setWeatherTypeFilter, setTempRangeFilter } from '../store/uiSlice';
import CustomSelect from './CustomSelect';

const FilterBar = () => {
  const dispatch = useDispatch();
  const { units, filter } = useSelector((state) => state.ui);

  const weatherOptions = [
    { value: 'all', label: 'All Weather' },
    { value: 'sunny', label: 'Sunny / Clear' },
    { value: 'cloudy', label: 'Cloudy' },
    { value: 'rainy', label: 'Rainy' },
    { value: 'snowy', label: 'Snowy' },
  ];

  const tempOptions = [
    { value: 'all', label: 'All Temps' },
    { value: 'freezing', label: 'Freezing (< 0°C)' },
    { value: 'cold', label: 'Cold (0-10°C)' },
    { value: 'mild', label: 'Mild (10-20°C)' },
    { value: 'warm', label: 'Warm (20-30°C)' },
    { value: 'hot', label: 'Hot (> 30°C)' },
  ];

  return (
    <div className="filter-bar" style={styles.container}>
      <button 
        className="btn" 
        onClick={() => dispatch(toggleUnits())}
        style={styles.unitBtn}
      >
        Units: {units === 'metric' ? '°C' : '°F'}
      </button>

      <div className="filters-group" style={styles.group}>
        <CustomSelect 
          label="Type" 
          options={weatherOptions} 
          value={filter.weatherType} 
          onChange={(val) => dispatch(setWeatherTypeFilter(val))} 
        />
        
        <CustomSelect 
          label="Temp" 
          options={tempOptions} 
          value={filter.tempRange} 
          onChange={(val) => dispatch(setTempRangeFilter(val))} 
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
    marginBottom: '20px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  group: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  unitBtn: {
    minWidth: '100px',
  },
};

export default FilterBar;

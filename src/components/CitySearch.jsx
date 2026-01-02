import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherData } from '../store/weatherSlice';
import { setCity } from '../store/locationSlice';
import { clearError } from '../store/uiSlice';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { searchCities } from '../services/cityService';

const CitySearch = () => {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (input.trim().length > 0) {
        const results = await searchCities(input);
        setSuggestions(results);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    dispatch(clearError());
  };

  const handleSearch = (city) => {
    if (city.trim()) {
      // Prevent search for single characters to avoid "No results" errors
      if (city.trim().length < 2) return;

      // Check if we have an exact case-insensitive match in suggestions to use the proper formatting
      const exactMatch = suggestions.find(s => s.toLowerCase() === city.toLowerCase());
      const searchTerm = exactMatch || city;

      dispatch(clearError());
      dispatch(setCity(searchTerm));
      dispatch(fetchWeatherData(searchTerm));
      setInput('');
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (city) => {
    handleSearch(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(input);
    }
  };

  return (
    <div className="city-search" style={styles.container} ref={dropdownRef}>
      <div className="search-box" style={styles.searchBox}>
        <FaSearch style={styles.icon} />
        <input
          type="text"
          className="city-search-input"
          placeholder="Search for a city..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
      </div>

      {showDropdown && (
        <div className="search-dropdown" style={styles.dropdown}>
          {suggestions.length > 0 ? (
            suggestions.map((city, index) => (
              <div
                key={index}
                className="search-result-item"
                style={styles.resultItem}
                onClick={() => handleSuggestionClick(city)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.paddingLeft = '30px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.paddingLeft = '25px';
                }}
              >
                <FaMapMarkerAlt style={{ marginRight: '10px', color: '#fff' }} />
                <span>{city}</span>
              </div>
            ))
          ) : (
             // Fallback if no specific matches found but user is typing - showing the input as a search option
             <div
               className="search-result-item"
               style={styles.resultItem}
               onClick={() => handleSearch(input)}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                 e.currentTarget.style.paddingLeft = '30px';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.paddingLeft = '25px';
               }}
             >
               <FaSearch style={{ marginRight: '10px', color: '#fff' }} />
               <span>Search for "{input}"</span>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.05))',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '25px',
    padding: '15px 25px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    transition: 'all 0.3s ease',
    width: '400px',
    maxWidth: '100%',
  },
  icon: {
    color: '#fff',
    marginRight: '15px',
    fontSize: '1.2rem',
    opacity: 0.9,
  },
  input: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.1rem',
    width: '100%',
    outline: 'none',
    fontWeight: '500',
  },
  dropdown: {
    position: 'absolute',
    top: '115%',
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 32px 0 rgba(19, 78, 94, 0.25)',
    overflow: 'hidden',
    zIndex: 100,
    animation: 'fadeIn 0.3s ease-out',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  resultItem: {
    padding: '18px 25px',
    cursor: 'pointer',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: '1.05rem',
  }
};

export default CitySearch;

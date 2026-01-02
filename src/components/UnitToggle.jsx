import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnits } from '../store/uiSlice';

const UnitToggle = () => {
  const dispatch = useDispatch();
  const { units } = useSelector((state) => state.ui);

  const styles = {
    container: {
      display: 'flex',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '4px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginLeft: 'auto', // Push to right if in flex container
    },
    button: {
      background: 'transparent',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.6)',
      padding: '5px 12px',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    active: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={{...styles.button, ...(units === 'metric' ? styles.active : {})}}
        onClick={() => units !== 'metric' && dispatch(toggleUnits())}
      >
        °C
      </button>
      <button 
        style={{...styles.button, ...(units === 'imperial' ? styles.active : {})}}
        onClick={() => units !== 'imperial' && dispatch(toggleUnits())}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;

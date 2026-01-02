import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';

const CustomSelect = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="custom-select-wrapper" style={styles.wrapper} ref={dropdownRef}>
      {label && <label style={styles.label}>{label}:</label>}
      <div style={{ position: 'relative' }}>
        <div 
          className="custom-select-display"
          style={{...styles.selectDisplay, ...(isOpen ? styles.selectDisplayOpen : {})}}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption ? selectedOption.label : 'Select...'}</span>
          <FaChevronDown style={{ 
            marginLeft: '10px', 
            fontSize: '0.8rem', 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease'
          }} />
        </div>

        {isOpen && (
          <div style={styles.optionsContainer}>
            {options.map((option) => (
              <div
                key={option.value}
                style={{
                  ...styles.option,
                  ...(option.value === value ? styles.selectedOption : {})
                }}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.paddingLeft = '25px'; // subtle slide effect
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = option.value === value ? 'rgba(255, 255, 255, 0.25)' : 'transparent';
                  e.currentTarget.style.paddingLeft = '20px';
                }}
              >
                {option.label}
                {option.value === value && <FaCheck style={{ fontSize: '0.7rem' }} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    // position: 'relative', // REMOVED: relative positioning now on inner container
    userSelect: 'none',
  },
  label: {
    marginRight: '10px',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  selectDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.4)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
    color: '#fff',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    cursor: 'pointer',
    minWidth: '180px',
    transition: 'all 0.4s ease',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  },
  selectDisplayOpen: {
    background: 'rgba(255,255,255,0.25)',
    borderColor: 'rgba(255,255,255,0.6)',
    boxShadow: '0 -5px 15px rgba(0,0,0,0.1)',
  },
  optionsContainer: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 32px 0 rgba(19, 78, 94, 0.2)',
    zIndex: 100,
    overflow: 'hidden',
    animation: 'slideDown 0.3s ease-out',
  },
  option: {
    padding: '12px 20px',
    cursor: 'pointer',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  selectedOption: {
    background: 'rgba(255, 255, 255, 0.25)',
    fontWeight: 'bold',
  },
};

export default CustomSelect;

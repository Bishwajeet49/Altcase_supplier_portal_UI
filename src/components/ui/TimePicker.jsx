import React, { useState, useRef, useEffect } from 'react';
import { useField } from 'formik';

const TimePicker = ({
  label,
  name,
  placeholder = 'Select time...',
  required = false,
  disabled = false,
  className = '',
  info,
  format24h = false
}) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  
  const dropdownRef = useRef(null);
  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);
  const periodScrollRef = useRef(null);

  // Generate hours array
  const hours = format24h 
    ? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    : Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  // Generate minutes array
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // Periods for 12h format
  const periods = ['AM', 'PM'];

  // Parse existing value
  useEffect(() => {
    if (value) {
      const timeRegex = format24h 
        ? /^(\d{1,2}):(\d{2})$/
        : /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
      
      const match = value.match(timeRegex);
      if (match) {
        if (format24h) {
          setSelectedHour(match[1].padStart(2, '0'));
          setSelectedMinute(match[2]);
        } else {
          setSelectedHour(match[1].padStart(2, '0'));
          setSelectedMinute(match[2]);
          setSelectedPeriod(match[3].toUpperCase());
        }
      }
    }
  }, [value, format24h]);

  // Handle clicking outside to close dropdown
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

  // Scroll to selected values when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (hourScrollRef.current) {
          const hourIndex = hours.indexOf(selectedHour);
          if (hourIndex !== -1) {
            hourScrollRef.current.scrollTop = hourIndex * 40;
          }
        }
        
        if (minuteScrollRef.current) {
          const minuteIndex = minutes.indexOf(selectedMinute);
          if (minuteIndex !== -1) {
            minuteScrollRef.current.scrollTop = minuteIndex * 40;
          }
        }
        
        if (periodScrollRef.current && !format24h) {
          const periodIndex = periods.indexOf(selectedPeriod);
          if (periodIndex !== -1) {
            periodScrollRef.current.scrollTop = periodIndex * 40;
          }
        }
      }, 50);
    }
  }, [isOpen, selectedHour, selectedMinute, selectedPeriod, format24h]);

  const handleTimeChange = (hour, minute, period) => {
    const timeString = format24h 
      ? `${hour}:${minute}`
      : `${hour}:${minute} ${period}`;
    setValue(timeString);
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    handleTimeChange(hour, selectedMinute, selectedPeriod);
  };

  const handleMinuteSelect = (minute) => {
    setSelectedMinute(minute);
    handleTimeChange(selectedHour, minute, selectedPeriod);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    handleTimeChange(selectedHour, selectedMinute, period);
  };

  const displayValue = value || '';

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-dark-700 mb-1">
          {label} {required && <span className="text-primary">*</span>}
          {info && (
            <span className="ml-1 text-dark-400 cursor-help" title={info}>
              ⓘ
            </span>
          )}
        </label>
      )}
      
      <div
        className={`w-full px-4 py-2 border border-dark-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer flex items-center justify-between ${className} ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`truncate ${!value ? 'text-dark-400' : 'text-dark-800'}`}>
          {value ? displayValue : placeholder}
        </span>
        <svg 
          className={`fill-current h-4 w-4 text-dark-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-dark-200 rounded-md shadow-lg">
          <div className="p-4">
            <div className={`flex ${format24h ? 'space-x-4' : 'space-x-2'}`}>
              {/* Hours Column */}
              <div className="flex-1">
                <div className="text-xs font-medium text-dark-600 mb-2 text-center">Hours</div>
                <div 
                  ref={hourScrollRef}
                  className="h-32 overflow-y-auto border border-dark-200 rounded scrollbar-thin scrollbar-thumb-gray-300"
                >
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className={`h-10 flex items-center justify-center cursor-pointer text-sm transition-colors ${
                        hour === selectedHour 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-gray-100 text-dark-700'
                      }`}
                      onClick={() => handleHourSelect(hour)}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Minutes Column */}
              <div className="flex-1">
                <div className="text-xs font-medium text-dark-600 mb-2 text-center">Minutes</div>
                <div 
                  ref={minuteScrollRef}
                  className="h-32 overflow-y-auto border border-dark-200 rounded scrollbar-thin scrollbar-thumb-gray-300"
                >
                  {minutes.map((minute) => (
                    <div
                      key={minute}
                      className={`h-10 flex items-center justify-center cursor-pointer text-sm transition-colors ${
                        minute === selectedMinute 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-gray-100 text-dark-700'
                      }`}
                      onClick={() => handleMinuteSelect(minute)}
                    >
                      {minute}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AM/PM Column (only for 12h format) */}
              {!format24h && (
                <div className="flex-1">
                  <div className="text-xs font-medium text-dark-600 mb-2 text-center">Period</div>
                  <div 
                    ref={periodScrollRef}
                    className="h-32 overflow-y-auto border border-dark-200 rounded scrollbar-thin scrollbar-thumb-gray-300"
                  >
                    {periods.map((period) => (
                      <div
                        key={period}
                        className={`h-10 flex items-center justify-center cursor-pointer text-sm transition-colors ${
                          period === selectedPeriod 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-gray-100 text-dark-700'
                        }`}
                        onClick={() => handlePeriodSelect(period)}
                      >
                        {period}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-3 flex justify-end space-x-2">
              <button
                type="button"
                className="px-3 py-1 text-sm text-dark-600 hover:text-dark-800"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden input for form submission */}
      <input 
        type="hidden" 
        id={name}
        name={name}
        value={value || ''}
        onChange={() => {}}
      />
      
      {meta.touched && meta.error ? (
        <div className="mt-1 text-sm text-primary">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TimePicker; 
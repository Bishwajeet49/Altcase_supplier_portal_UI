import React from 'react';
import { useField } from 'formik';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css'; // Custom styles

const DatePicker = ({
  label,
  name,
  placeholder = 'Select date...',
  required = false,
  disabled = false,
  className = '',
  info,
  minDate,
  maxDate,
  dateFormat = 'dd/MM/yyyy'
}) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const handleDateChange = (date) => {
    setValue(date);
  };

  return (
    <div className="mb-4">
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
      
      <div className="relative">
        <ReactDatePicker
          id={name}
          selected={value}
          onChange={handleDateChange}
          placeholderText={placeholder}
          dateFormat={dateFormat}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          className={`w-full px-3 py-2 pr-10 border border-dark-200 rounded-md shadow-sm placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
          } ${meta.touched && meta.error ? 'border-primary' : ''} ${className}`}
          calendarClassName="custom-datepicker"
          popperClassName="custom-datepicker-popper"
          wrapperClassName="w-full"
        />
        
        {/* Calendar Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`w-5 h-5 ${disabled ? 'text-gray-400' : 'text-dark-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
      
      {meta.touched && meta.error ? (
        <div className="mt-1 text-sm text-primary">{meta.error}</div>
      ) : null}
      
      <style jsx global>{`
        .react-datepicker {
          font-family: inherit;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .react-datepicker__header {
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          border-radius: 0.375rem 0.375rem 0 0;
        }
        
        .react-datepicker__current-month {
          color: #374151;
          font-weight: 600;
        }
        
        .react-datepicker__day-name {
          color: #6b7280;
          font-weight: 500;
        }
        
        .react-datepicker__day {
          color: #374151;
          border-radius: 0.375rem;
          margin: 0.125rem;
          transition: all 0.2s ease;
        }
        
        .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
          background-color: #fed7aa;
          color: #ea580c;
        }
        
        .react-datepicker__day--selected {
          background-color: #ea580c !important;
          color: white !important;
        }
        
        .react-datepicker__day--keyboard-selected {
          background-color: #f97316 !important;
          color: white !important;
        }
        
        .react-datepicker__day--today {
          font-weight: 600;
          color: #ea580c;
          background-color: #fff7ed;
        }
        
        .react-datepicker__day--disabled {
          color: #d1d5db !important;
          background-color: #f9fafb !important;
          cursor: not-allowed !important;
          opacity: 0.5;
        }
        
        .react-datepicker__day--disabled:hover {
          background-color: #f9fafb !important;
          color: #d1d5db !important;
        }
        
        .react-datepicker__day--outside-month {
          color: #d1d5db;
        }
        
        .react-datepicker__navigation {
          top: 13px;
          color: #6b7280;
        }
        
        .react-datepicker__navigation:hover {
          color: #ea580c;
        }
        
        .react-datepicker__navigation--previous {
          left: 12px;
        }
        
        .react-datepicker__navigation--next {
          right: 12px;
        }
        
        .react-datepicker__triangle {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DatePicker; 
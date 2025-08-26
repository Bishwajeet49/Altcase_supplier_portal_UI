import React, { useState, useRef, useEffect } from 'react';
import { useField } from 'formik';

const Select = ({
  label,
  name,
  options = [],
  placeholder = 'Select...',
  required = false,
  disabled = false,
  className = '',
  info,
  searchable = false
}) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

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

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Reset search term when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  // Find the label for the currently selected value
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';

  // Filter options based on search term
  const filteredOptions = searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

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
        className={`w-full px-4 py-2 border border-dark-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer  flex items-center justify-between ${className}  ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
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
        <div className="absolute z-10 w-full mt-1 bg-white border border-dark-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <div className="sticky top-0 bg-white p-2 border-b border-dark-100">
              <input
                ref={searchInputRef}
                type="text"
                className="w-full px-3 py-1.5 text-sm border border-dark-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-[#f9fafb] ${option.value === value ? 'bg-[#f3f4f6] text-primary' : 'text-dark-700'}`}
                onClick={() => {
                  setValue(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-dark-400">
              {searchTerm ? 'No matching options' : 'No options available'}
            </div>
          )}
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

export default Select; 
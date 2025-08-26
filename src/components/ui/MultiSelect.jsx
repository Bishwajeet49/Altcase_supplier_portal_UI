import React, { useState, useRef, useEffect } from 'react';
import { Field, ErrorMessage, useField } from 'formik';

const MultiSelect = ({
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

  const handleToggleOption = (optionValue) => {
    const currentValues = Array.isArray(value) ? [...value] : [];
    
    if (currentValues.includes(optionValue)) {
      setValue(currentValues.filter(val => val !== optionValue));
    } else {
      setValue([...currentValues, optionValue]);
    }
  };
  
  // Get selected options labels for display
  const selectedLabels = Array.isArray(value) 
    ? options
        .filter(option => value.includes(option.value))
        .map(option => option.label)
    : [];

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
        className={`w-full px-4 py-2 border border-dark-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer bg-white flex items-center justify-between ${className} ${disabled ? 'bg-dark-100 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 items-center">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label, index) => (
              <div key={index} className="inline-flex items-center bg-[#f3f4f6] text-dark-700 text-xs font-medium px-2 py-0.5 mr-1 mb-1 rounded">
                {label}
              </div>
            ))
          ) : (
            <span className="text-dark-400">{placeholder}</span>
          )}
        </div>
        <svg className={`flex-shrink-0 fill-current h-4 w-4 transition-transform text-dark-500 ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
            filteredOptions.map((option) => {
              const isSelected = Array.isArray(value) && value.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer hover:bg-[#f9fafb] ${isSelected ? 'bg-[#f3f4f6]' : ''}`}
                  onClick={() => handleToggleOption(option.value)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mr-2 text-primary focus:ring-primary focus:ring-offset-0 border-dark-300"
                    />
                    <span className={isSelected ? 'text-primary' : 'text-dark-700'}>
                      {option.label}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-2 text-dark-400">
              {searchTerm ? 'No matching options' : 'No options available'}
            </div>
          )}
        </div>
      )}
      
      {/* Hidden field for Formik */}
      <input type="hidden" {...field} />
      
      <ErrorMessage name={name} component="div" className="mt-1 text-sm text-primary" />
    </div>
  );
};

export default MultiSelect; 
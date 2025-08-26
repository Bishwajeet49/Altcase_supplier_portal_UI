import React from 'react';
import CreatableSelect from 'react-select/creatable';

const MultiSelectCreatable = ({
  value,
  onChange,
  options,
  placeholder = 'Select or create options...',
  isMulti = true,
  isClearable = true,
  isSearchable = true,
  isDisabled = false,
  isLoading = false,
  noOptionsMessage = () => 'No options available',
  loadingMessage = () => 'Loading...',
  formatCreateLabel = (inputValue) => `Create "${inputValue}"`,
  onCreateOption,
  className = '',
  ...props
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '42px',
      border: state.isFocused ? '1px solid #21B546' : '1px solid #d1d5db',
      borderRadius: '8px',
      boxShadow: state.isFocused ? '0 0 0 1px #21B546' : 'none',
      '&:hover': {
        border: state.isFocused ? '1px solid #21B546' : '1px solid #d1d5db',
      },
      backgroundColor: isDisabled ? '#f9fafb' : 'white',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#f3f4f6',
      borderRadius: '6px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#374151',
      fontWeight: '500',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#6b7280',
      '&:hover': {
        backgroundColor: '#e5e7eb',
        color: '#374151',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#f9fafb'
        : state.isFocused 
        ? '#f3f4f6'
        : 'transparent',
      color: state.isSelected ? '#21B546' : '#374151',
      '&:hover': {
        backgroundColor: '#f3f4f6',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#374151',
    }),
    input: (provided) => ({
      ...provided,
      color: '#6b7280',
    }),
  };

  return (
    <div className={className}>
      <CreatableSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        noOptionsMessage={noOptionsMessage}
        loadingMessage={loadingMessage}
        formatCreateLabel={formatCreateLabel}
        onCreateOption={onCreateOption}
        styles={customStyles}
        classNamePrefix="react-select"
        {...props}
      />
    </div>
  );
};

export default MultiSelectCreatable; 
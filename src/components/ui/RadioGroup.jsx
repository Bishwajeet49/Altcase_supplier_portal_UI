import React from 'react';
import { useField } from 'formik';
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';

const RadioGroup = ({
  label,
  name,
  options = [],
  required = false,
  disabled = false,
  className = '',
  info,
  direction = 'horizontal' // 'horizontal' or 'vertical'
}) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const handleChange = (selectedValue) => {
    setValue(selectedValue);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-dark-700 mb-1">
          {label} {required && <span className="text-primary">*</span>}
          {info && (
            <span className="ml-1 text-dark-400 cursor-help" title={info}>
              ⓘ
            </span>
          )}
        </label>
      )}
      
      <HeadlessRadioGroup
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={className}
      >
        <div className={`${direction === 'horizontal' ? 'flex space-x-4' : 'space-y-2'}`}>
          {options.map((option) => (
            <HeadlessRadioGroup.Option
              key={option.value}
              value={option.value}
              className={({ active, checked }) =>
                `${active ? 'ring-2 ring-primary ring-offset-2' : ''}
                 ${checked ? 'bg-primary text-white' : 'bg-white text-dark-700'}
                 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                 relative flex items-center justify-center rounded-md border border-dark-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none transition-colors duration-200`
              }
              disabled={disabled}
            >
              {({ active, checked }) => (
                <div className="flex items-center">
                  <div className={`flex-shrink-0 w-4 h-4 rounded-full border-2 mr-2 ${
                    checked 
                      ? 'border-white bg-white' 
                      : 'border-dark-300 bg-white'
                  }`}>
                    {checked && (
                      <div className="w-full h-full rounded-full bg-primary scale-50"></div>
                    )}
                  </div>
                  <HeadlessRadioGroup.Label
                    as="span"
                    className={`${checked ? 'text-white' : 'text-dark-700'}`}
                  >
                    {option.label}
                  </HeadlessRadioGroup.Label>
                </div>
              )}
            </HeadlessRadioGroup.Option>
          ))}
        </div>
      </HeadlessRadioGroup>
      
      {/* Hidden input for form submission */}
      <input 
        type="hidden" 
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

export default RadioGroup; 
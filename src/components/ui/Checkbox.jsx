import React from 'react';
import { Field, ErrorMessage } from 'formik';

const Checkbox = ({
  label,
  name,
  required = false,
  disabled = false,
  className = '',
  info
}) => {
  return (
    <div className="mb-4 flex items-center">
      <Field
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
        className={`h-4 w-4 text-primary focus:ring-1 focus:ring-primary focus:ring-offset-0 border-dark-300 rounded ${className} ${disabled ? 'bg-dark-100' : ''}`}
      />
      {label && (
        <label htmlFor={name} className="ml-2 block text-sm font-medium text-dark-700">
          {label} {required && <span className="text-primary">*</span>}
          {info && (
            <span className="ml-1 text-dark-400 cursor-help" title={info}>
              ⓘ
            </span>
          )}
        </label>
      )}
      <ErrorMessage name={name} component="div" className="mt-1 text-sm text-primary" />
    </div>
  );
};

export default Checkbox; 
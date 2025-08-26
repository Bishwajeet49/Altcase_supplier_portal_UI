import React from 'react';
import { useField } from 'formik';

const Input = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  required = false, 
  disabled = false, 
  className = '', 
  info,
  value,
  onChange,
  onBlur,
  error,
  touched,
  useFormik = true,
  ...props 
}) => {
  // Use Formik if useFormik is true and we're in a Formik context
  let fieldValue, fieldError, fieldTouched, handleChange, handleBlur;
  
  if (useFormik) {
    try {
      const [field, meta, helpers] = useField(name);
      fieldValue = field.value;
      fieldError = meta.error;
      fieldTouched = meta.touched;
      handleChange = (e) => helpers.setValue(e.target.value);
      handleBlur = () => helpers.setTouched(true);
    } catch (error) {
      // If useField fails (not in Formik context), fall back to controlled input
      console.warn('Input component not in Formik context, using controlled input');
      fieldValue = value || '';
      fieldError = error;
      fieldTouched = touched;
      handleChange = onChange || (() => {});
      handleBlur = onBlur || (() => {});
    }
  } else {
    // Use controlled input props directly
    fieldValue = value || '';
    fieldError = error;
    fieldTouched = touched;
    handleChange = onChange || (() => {});
    handleBlur = onBlur || (() => {});
  }

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-theme-textPrimary mb-1">
          {label} {required && <span className="text-primary">*</span>}
          {info && (
            <span className="ml-1 text-theme-textSecondary cursor-help" title={info}>
              ⓘ
            </span>
          )}
        </label>
      )}
      
      <input
        id={name}
        name={name}
        type={type}
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2 border border-theme-borderSecondary rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${className} ${disabled ? 'bg-theme-bgTertiary' : 'bg-theme-bgSecondary'} text-theme-textPrimary placeholder:text-theme-textMuted`}
        {...props}
      />
      
      {fieldTouched && fieldError && (
        <div className="mt-1 text-sm text-red-400">{fieldError}</div>
      )}
    </div>
  );
};

export default Input; 
import React from 'react';

const FormWrapper = ({ 
  children, 
  className = "",
  wrapInContainer = false
}) => {
  return (
    <div className={`${wrapInContainer?'bg-white rounded-lg shadow-sm p-6 border border-[#e5e7eb]':''} ${className}`}>
      {children}
    </div>
  );
};

export default FormWrapper; 
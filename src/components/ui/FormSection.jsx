import React from 'react';

const FormSection = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-theme-accentLight/5 border border-theme-borderPrimary rounded-lg p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-theme-textPrimary mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default FormSection; 
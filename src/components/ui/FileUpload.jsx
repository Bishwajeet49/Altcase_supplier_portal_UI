import React, { useState, useRef, useEffect } from 'react';
import { useField } from 'formik';

const FileUpload = ({
  label,
  name,
  accept = 'image/*',
  required = false,
  disabled = false,
  className = '',
  info,
  maxSize = 5 * 1024 * 1024, // 5MB default
  showPreview = true
}) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;
  
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Handle existing image URL in edit mode
  useEffect(() => {
    if (value && typeof value === 'string' && value.startsWith('http')) {
      // This is an existing image URL from edit mode
      setPreview(value);
    } else if (value && value instanceof File) {
      // This is a newly uploaded file
      if (showPreview && value.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target.result);
        };
        reader.readAsDataURL(value);
      }
    } else {
      // No value, clear preview
      setPreview(null);
    }
  }, [value, showPreview]);

  const handleFileChange = (file) => {
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      alert(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return;
    }

    // Validate file type
    if (accept && accept !== '*') {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type === '*') return true;
        if (type.endsWith('/*')) {
          // Handle wildcard types like "image/*"
          const baseType = type.split('/')[0];
          return file.type.startsWith(baseType + '/');
        }
        // Handle specific types like "image/png"
        return file.type === type;
      });
      
      if (!isAccepted) {
        alert(`Invalid file type. Accepted types: ${accept}`);
        return;
      }
    }

    setValue(file);

    // Create preview for images
    if (showPreview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleRemove = () => {
    setValue(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Check if we have an existing image (either URL or File)
  const hasExistingImage = value && (typeof value === 'string' || value instanceof File);
  
  // Get display name for the image
  const getImageName = () => {
    if (value instanceof File) {
      return value.name;
    } else if (typeof value === 'string' && value.startsWith('http')) {
      // Extract filename from URL or use a default name
      try {
        const url = new URL(value);
        const pathname = url.pathname;
        const filename = pathname.split('/').pop();
        return filename || 'Existing image';
      } catch {
        return 'Existing image';
      }
    }
    return 'Image';
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
      
      <div
        className={`relative border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
          dragOver 
            ? 'border-primary bg-primary/5' 
            : hasExistingImage 
              ? 'border-primary bg-primary/5' 
              : 'border-dark-200 hover:border-dark-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-48 mx-auto rounded shadow-sm"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              ×
            </button>
            <div className="mt-2 text-sm text-dark-600">
              {getImageName()}
            </div>
            <div className="text-xs text-dark-400">
              Click to change or drag a new image
            </div>
          </div>
        ) : value && !preview ? (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-dark-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="mt-2 text-sm text-dark-600">
                {value.toString()}
              </div>
              <button
                type="button"
                className="mt-1 text-xs text-red-600 hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                Remove file
              </button>
            </div>
          </div>
        ) : (
          <>
            <svg className="mx-auto h-12 w-12 text-dark-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="mt-2">
              <p className="text-sm text-dark-600">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-dark-400">
                {accept === 'image/*' ? 'PNG, JPG, GIF' : 'Files'} up to {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
          </>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
        />
      </div>
      
      {meta.touched && meta.error ? (
        <div className="mt-1 text-sm text-primary">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FileUpload; 
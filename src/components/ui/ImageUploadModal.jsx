import React, { useState, useRef } from 'react';

const ImageUploadModal = ({ onClose, onInsertImage }) => {
  const [activeTab, setActiveTab] = useState('url'); // 'url' or 'upload'
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setUploadedImage(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setError('');

    if (activeTab === 'url') {
      if (!imageUrl.trim()) {
        setError('Please enter an image URL');
        setIsLoading(false);
        return;
      }

      // Validate URL
      try {
        new URL(imageUrl);
        
        // Prepare image attributes
        const imageAttrs = { src: imageUrl };
        
        // Delay the actual insertion to avoid React lifecycle issues
        setTimeout(() => {
          onInsertImage(imageAttrs);
          onClose();
        }, 0);
      } catch (e) {
        setError('Please enter a valid URL');
        setIsLoading(false);
      }
    } else {
      if (!uploadedImage) {
        setError('Please select an image to upload');
        setIsLoading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        // Prepare image attributes
        const imageAttrs = { src: reader.result };
        
        // Delay the actual insertion to avoid React lifecycle issues
        setTimeout(() => {
          onInsertImage(imageAttrs);
          onClose();
        }, 0);
      };
      reader.onerror = () => {
        setError('Failed to read the file');
        setIsLoading(false);
      };
      reader.readAsDataURL(uploadedImage);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (activeTab !== 'upload') return;
    
    const file = e.dataTransfer.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please drop an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setUploadedImage(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-dark-200">
          <h3 className="text-lg font-medium text-dark-800">Insert Image</h3>
          <button 
            type="button" 
            className="text-dark-500 hover:text-dark-700"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {/* Tabs */}
          <div className="flex border-b border-dark-200 mb-4">
            <button
              type="button"
              className={`px-4 py-2 font-medium text-sm focus:outline-none focus:ring-0 focus:ring-transparent ${
                activeTab === 'url'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-dark-500 hover:text-dark-800'
              }`}
              onClick={() => setActiveTab('url')}
            >
              Image URL
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-medium text-sm focus:outline-none focus:ring-0 focus:ring-transparent ${
                activeTab === 'upload'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-dark-500 hover:text-dark-800'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              Upload Image
            </button>
          </div>

          {/* URL Input */}
          {activeTab === 'url' && (
            <div className="mb-4">
              <label htmlFor="image-url" className="block text-sm font-medium text-dark-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="image-url"
                className="w-full px-4 py-2 border border-dark-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={handleUrlChange}
              />
            </div>
          )}

          {/* File Upload */}
          {activeTab === 'upload' && (
            <div 
              className="mb-4"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Upload Image
              </label>
              
              <div 
                className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-dark-50 transition-colors ${
                  previewUrl ? 'border-primary bg-primary bg-opacity-5' : 'border-dark-200'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <div className="relative">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded shadow-sm"
                    />
                    <div className="mt-2 text-sm text-dark-500">
                      Click to change image
                    </div>
                  </div>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-dark-500">
                      Click to browse or drag and drop an image
                    </p>
                    <p className="mt-1 text-xs text-dark-400">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="text-primary text-sm mb-4">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-dark-200 rounded-md text-dark-700 hover:bg-dark-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-primary border border-primary rounded-md text-white hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Inserting...
                </span>
              ) : (
                'Insert Image'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal; 
import React, { useState } from 'react';
import { FaTimes, FaBuilding, FaRupeeSign, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SubmitQuoteModal = ({ isOpen, onClose, demand, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    price: '',
    tat: '',
    remarks: '',
    deliveryMethod: 'demat',
    guaranteeCompliance: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.price || !formData.tat) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    if (!formData.guaranteeCompliance) {
      toast.error('Please confirm compliance guarantee');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const quoteData = {
        demandId: demand.id,
        price: parseFloat(formData.price),
        tat: formData.tat,
        remarks: formData.remarks,
        deliveryMethod: formData.deliveryMethod,
        submittedAt: new Date().toISOString()
      };

      // Call the onSubmitSuccess callback with the quote data
      if (onSubmitSuccess) {
        const result = await onSubmitSuccess(demand.id, quoteData);
        
        if (result && result.success) {
          toast.success('Quote submitted successfully!');
          onClose();
          // Reset form
          setFormData({
            price: '',
            tat: '',
            remarks: '',
            deliveryMethod: 'demat',
            guaranteeCompliance: false
          });
        } else {
          toast.error(result?.message || 'Failed to submit quote');
        }
      } else {
        // Fallback for when no onSubmitSuccess is provided
        toast.success('Quote submitted successfully!');
        onClose();
        setFormData({
          price: '',
          tat: '',
          remarks: '',
          deliveryMethod: 'demat',
          guaranteeCompliance: false
        });
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error('Failed to submit quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!isOpen || !demand) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-theme-bgPrimary border border-theme-borderPrimary rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-theme-borderSecondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FaBuilding className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-theme-textPrimary">Submit Quote</h2>
              <p className="text-sm text-theme-textSecondary">{demand.companyName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-theme-bgSecondary hover:bg-theme-bgTertiary rounded-lg flex items-center justify-center transition-colors"
          >
            <FaTimes className="w-4 h-4 text-theme-textSecondary" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Demand Summary */}
          <div className="p-6 bg-theme-accentLight/5 border-b border-theme-borderSecondary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-theme-textSecondary mb-1">Quantity Required</p>
                <p className="text-lg font-bold text-theme-textPrimary">{demand.quantity?.toLocaleString() || 'N/A'}</p>
                <p className="text-xs text-theme-textSecondary">shares</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-theme-textSecondary mb-1">Expected Price</p>
                <p className="text-lg font-bold text-primary">{demand.expectedPrice ? formatCurrency(demand.expectedPrice) : 'N/A'}</p>
                <p className="text-xs text-theme-textSecondary">per share</p>
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Price Input */}
              <div>
                <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                  Your Quote Price (per share) *
                </label>
                <div className="relative">
                  <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-textSecondary" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter your price per share"
                    className="w-full pl-10 pr-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
                <p className="text-xs text-theme-textMuted mt-1">
                  Expected: {demand.expectedPrice ? formatCurrency(demand.expectedPrice) : 'N/A'}
                </p>
              </div>

              {/* TAT Input */}
              <div>
                <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                  Delivery Timeline (TAT) *
                </label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-textSecondary" />
                  <select
                    name="tat"
                    value={formData.tat}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
                    required
                  >
                    <option value="">Select delivery timeline</option>
                    <option value="1 day">1 day</option>
                    <option value="2 days">2 days</option>
                    <option value="3 days">3 days</option>
                    <option value="5 days">5 days</option>
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                  </select>
                </div>
                <p className="text-xs text-theme-textMuted mt-1">
                  Expected: {demand.expectedTat || 'N/A'}
                </p>
              </div>

             

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                  Additional Remarks
                </label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder="Any additional information about your quote..."
                  rows="3"
                  className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted resize-none"
                />
              </div>

              {/* Compliance Guarantee */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="guaranteeCompliance"
                    checked={formData.guaranteeCompliance}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-primary bg-theme-bgSecondary border border-theme-borderSecondary rounded focus:ring-primary focus:ring-2"
                    required
                  />
                  <div className="text-sm text-theme-textSecondary">
                    I guarantee that the shares will meet all compliance requirements and will be delivered as per the agreed timeline. I understand that failure to deliver may result in penalties.
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 flex items-center gap-3 p-6 border-t border-theme-borderSecondary">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-theme-bgSecondary hover:bg-theme-bgTertiary text-theme-textPrimary border border-theme-borderSecondary rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg transition-colors font-medium"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quote'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitQuoteModal;

import React, { useState } from 'react';
import { FaTimes, FaHeart, FaBuilding, FaInfoCircle } from 'react-icons/fa';

const ExpressInterestModal = ({ isOpen, onClose, onInterestSuccess, share }) => {
  const [formData, setFormData] = useState({
    interestedQuantity: '',
    budgetRange: '',
    timeframe: '',
    contactNumber: '',
    email: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const interestData = {
        shareId: share.id,
        interestedQuantity: parseInt(formData.interestedQuantity) || null,
        budgetRange: formData.budgetRange,
        timeframe: formData.timeframe,
        contactNumber: formData.contactNumber,
        email: formData.email,
        additionalNotes: formData.additionalNotes
      };

      console.log('Expressing interest:', interestData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        interestedQuantity: '',
        budgetRange: '',
        timeframe: '',
        contactNumber: '',
        email: '',
        additionalNotes: ''
      });
      
      onInterestSuccess({
        message: 'Interest registered successfully! The supplier will contact you soon.'
      });
    } catch (error) {
      console.error('Error expressing interest:', error);
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

  if (!isOpen || !share) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-theme-bgPrimary border border-theme-borderPrimary rounded-2xl shadow-2xl w-full max-w-lg h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-theme-borderSecondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FaHeart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-theme-textPrimary">Express Interest</h2>
              <p className="text-sm text-theme-textSecondary">{share.companyName}</p>
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
          {/* Share Summary */}
          <div className="p-6 bg-theme-accentLight/5 border-b border-theme-borderSecondary">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <FaBuilding className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-theme-textPrimary">{share.companyName}</h3>
                <p className="text-sm text-theme-textSecondary">{share.shareType} • {share.sector}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-theme-textSecondary mb-1">Available</p>
                <p className="font-bold text-theme-textPrimary">{share.availableQuantity.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-theme-textSecondary mb-1">Price</p>
                <p className="font-bold text-primary">{formatCurrency(share.pricePerShare)}</p>
              </div>
            </div>
          </div>

          {/* Interest Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Information Note */}
              <div className="bg-blue-400/5 rounded-xl p-4 border border-blue-400/20">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-theme-textSecondary">
                    <p className="font-medium text-theme-textPrimary mb-1">About Interest Registration</p>
                    <p>By expressing interest, you'll be added to the interested buyers list. The supplier may contact you directly with better offers or negotiate terms.</p>
                  </div>
                </div>
              </div>

              {/* Interested Quantity */}
              <div>
                <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                  Interested Quantity (Optional)
                </label>
                <input
                  type="number"
                  name="interestedQuantity"
                  value={formData.interestedQuantity}
                  onChange={handleInputChange}
                  placeholder="How many shares are you interested in?"
                  className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
                  min={share.minQuantity}
                  max={share.availableQuantity}
                />
                <p className="text-xs text-theme-textMuted mt-1">
                  Range: {share.minQuantity.toLocaleString()} - {share.availableQuantity.toLocaleString()} shares
                </p>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                  Budget Range (Optional)
                </label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
                >
                  <option value="">Select your budget range</option>
                  <option value="under-1-lakh">Under ₹1 Lakh</option>
                  <option value="1-5-lakh">₹1 - ₹5 Lakh</option>
                  <option value="5-10-lakh">₹5 - ₹10 Lakh</option>
                  <option value="10-25-lakh">₹10 - ₹25 Lakh</option>
                  <option value="25-50-lakh">₹25 - ₹50 Lakh</option>
                  <option value="above-50-lakh">Above ₹50 Lakh</option>
                </select>
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                  Purchase Timeframe (Optional)
                </label>
                <select
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
                >
                  <option value="">When are you looking to purchase?</option>
                  <option value="immediately">Immediately</option>
                  <option value="within-week">Within a week</option>
                  <option value="within-month">Within a month</option>
                  <option value="within-quarter">Within 3 months</option>
                  <option value="flexible">Flexible timeline</option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your contact number"
                    className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
                    required
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements, questions, or notes for the supplier..."
                  rows="3"
                  className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted resize-none"
                />
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
            {isSubmitting ? 'Submitting...' : 'Express Interest'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpressInterestModal;

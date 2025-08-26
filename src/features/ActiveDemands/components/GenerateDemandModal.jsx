import React, { useState } from 'react';
import { FaTimes, FaBuilding, FaRupeeSign, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

const GenerateDemandModal = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    shareType: '',
    sector: '',
    quantity: '',
    pricePerShare: '',
    validity: '',
    description: '',
    deliveryMethod: 'demat',
    complianceGuarantee: false
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
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      console.log('Submitting demand:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        companyName: '',
        shareType: '',
        sector: '',
        quantity: '',
        pricePerShare: '',
        validity: '',
        description: '',
        deliveryMethod: 'demat',
        complianceGuarantee: false
      });
      
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting demand:', error);
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

  if (!isOpen) return null;

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
              <h2 className="text-xl font-bold text-theme-textPrimary">Post Share Demand</h2>
              <p className="text-sm text-theme-textSecondary">Request shares you need</p>
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
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Company Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                    Share Type *
                  </label>
                  <select
                    name="shareType"
                    value={formData.shareType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
                    required
                  >
                    <option value="">Select share type</option>
                    <option value="Equity">Equity</option>
                    <option value="Preference">Preference</option>
                    <option value="Debenture">Debenture</option>
                    <option value="Warrant">Warrant</option>
                  </select>
                </div>
              </div>

              {/* Sector */}
              <div>
                <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                  Sector *
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
                  required
                >
                  <option value="">Select sector</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Banking">Banking</option>
                  <option value="Oil & Gas">Oil & Gas</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Paints & Chemicals">Paints & Chemicals</option>
                  <option value="Automobile">Automobile</option>
                  <option value="Pharmaceuticals">Pharmaceuticals</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Consumer Goods">Consumer Goods</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Quantity and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div>
                   <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                     Quantity Required *
                   </label>
                   <input
                     type="number"
                     name="quantity"
                     value={formData.quantity}
                     onChange={handleInputChange}
                     placeholder="Enter quantity needed"
                     className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
                     min="1"
                     required
                   />
                   <p className="text-xs text-theme-textMuted mt-1">Number of shares needed</p>
                 </div>
                                 <div>
                   <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                     Expected Price per Share *
                   </label>
                   <div className="relative">
                     <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-textSecondary" />
                     <input
                       type="number"
                       name="pricePerShare"
                       value={formData.pricePerShare}
                       onChange={handleInputChange}
                       placeholder="Enter expected price per share"
                       className="w-full pl-10 pr-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted"
                       min="1"
                       step="0.01"
                       required
                     />
                   </div>
                 </div>
              </div>

                             {/* Expected TAT */}
               <div>
                 <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                   Expected Delivery Timeline (TAT) *
                 </label>
                 <div className="relative">
                   <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-textSecondary" />
                   <select
                     name="validity"
                     value={formData.validity}
                     onChange={handleInputChange}
                     className="w-full pl-10 pr-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary"
                     required
                   >
                     <option value="">Select expected delivery timeline</option>
                     <option value="1 day">1 day</option>
                     <option value="2 days">2 days</option>
                     <option value="3 days">3 days</option>
                     <option value="5 days">5 days</option>
                     <option value="1 week">1 week</option>
                     <option value="2 weeks">2 weeks</option>
                     <option value="1 month">1 month</option>
                   </select>
                 </div>
               </div>

                             {/* Preferred Delivery Method */}
               <div>
                 <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                   Preferred Delivery Method
                 </label>
                 <div className="grid grid-cols-2 gap-3">
                   <label className="flex items-center p-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                     <input
                       type="radio"
                       name="deliveryMethod"
                       value="demat"
                       checked={formData.deliveryMethod === 'demat'}
                       onChange={handleInputChange}
                       className="sr-only"
                     />
                     <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.deliveryMethod === 'demat' ? 'border-primary bg-primary' : 'border-theme-borderSecondary'}`}>
                       {formData.deliveryMethod === 'demat' && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                     </div>
                     <span className="text-sm text-theme-textPrimary">Demat Form</span>
                   </label>
                   <label className="flex items-center p-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                     <input
                       type="radio"
                       name="deliveryMethod"
                       value="physical"
                       checked={formData.deliveryMethod === 'physical'}
                       onChange={handleInputChange}
                       className="sr-only"
                     />
                     <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.deliveryMethod === 'physical' ? 'border-primary bg-primary' : 'border-theme-borderSecondary'}`}>
                       {formData.deliveryMethod === 'physical' && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                     </div>
                     <span className="text-sm text-theme-textPrimary">Physical Form</span>
                   </label>
                 </div>
               </div>

                             {/* Description */}
               <div>
                 <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                   Additional Requirements
                 </label>
                 <textarea
                   name="description"
                   value={formData.description}
                   onChange={handleInputChange}
                   placeholder="Any additional requirements, special conditions, or specific details about the shares you need..."
                   rows="3"
                   className="w-full px-4 py-3 bg-theme-bgSecondary border border-theme-borderSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-theme-textPrimary placeholder:text-theme-textMuted resize-none"
                 />
               </div>

                             {/* Terms Agreement */}
               <div>
                 <label className="flex items-start gap-3 cursor-pointer">
                   <input
                     type="checkbox"
                     name="complianceGuarantee"
                     checked={formData.complianceGuarantee}
                     onChange={handleInputChange}
                     className="mt-1 w-4 h-4 text-primary bg-theme-bgSecondary border border-theme-borderSecondary rounded focus:ring-primary focus:ring-2"
                     required
                   />
                   <div className="text-sm text-theme-textSecondary">
                     I understand that this is a demand request and I agree to the terms and conditions. I will review and respond to any quotes received from suppliers.
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
            {isSubmitting ? 'Submitting...' : 'Post Demand'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateDemandModal;

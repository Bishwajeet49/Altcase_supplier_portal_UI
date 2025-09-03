import React, { useState, useEffect } from 'react';
import { FaTimes, FaBuilding, FaRupeeSign, FaShoppingCart, FaCalculator, FaInfoCircle } from 'react-icons/fa';

const PurchaseModal = ({ isOpen, onClose, onPurchaseSuccess, share }) => {
  const [formData, setFormData] = useState({
    quantity: '',
    totalAmount: 0,
    contactNumber: '',
    email: '',
    agreedToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (share && isOpen) {
      // Set minimum quantity as default
      const minQty = share.minQuantity.toString();
      setFormData(prev => ({
        ...prev,
        quantity: minQty,
        totalAmount: share.minQuantity * share.pricePerShare
      }));
    }
  }, [share, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'quantity') {
      const qty = parseInt(value) || 0;
      const totalAmount = qty * (share?.pricePerShare || 0);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        totalAmount
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const purchaseData = {
        shareId: share.id,
        quantity: parseInt(formData.quantity),
        pricePerShare: share.pricePerShare,
        totalAmount: formData.totalAmount,
        contactNumber: formData.contactNumber,
        email: formData.email
      };

      console.log('Submitting purchase:', purchaseData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        quantity: '',
        totalAmount: 0,
        contactNumber: '',
        email: '',
        agreedToTerms: false
      });
      
      onPurchaseSuccess({
        orderId: `ORD${Date.now()}`,
        message: 'Purchase order placed successfully',
        estimatedSettlement: '2-3 business days'
      });
    } catch (error) {
      console.error('Error submitting purchase:', error);
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

  const isQuantityValid = () => {
    const qty = parseInt(formData.quantity) || 0;
    return qty >= share?.minQuantity && qty <= share?.maxQuantity && qty <= share?.availableQuantity;
  };

  const getQuantityError = () => {
    const qty = parseInt(formData.quantity) || 0;
    if (qty < share?.minQuantity) return `Minimum quantity is ${share.minQuantity.toLocaleString()}`;
    if (qty > share?.maxQuantity) return `Maximum quantity is ${share.maxQuantity.toLocaleString()}`;
    if (qty > share?.availableQuantity) return `Only ${share.availableQuantity.toLocaleString()} shares available`;
    return '';
  };

  if (!isOpen || !share) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-theme-bgPrimary border border-theme-borderPrimary rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-theme-borderSecondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FaShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-theme-textPrimary">Purchase Shares</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-theme-textSecondary mb-1">Available Quantity</p>
                <p className="text-lg font-bold text-theme-textPrimary">{share.availableQuantity.toLocaleString()}</p>
                <p className="text-xs text-theme-textSecondary">shares</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-theme-textSecondary mb-1">Price per Share</p>
                <p className="text-lg font-bold text-primary">{formatCurrency(share.pricePerShare)}</p>
                {share.originalPrice && (
                  <p className="text-xs text-theme-textMuted line-through">
                    {formatCurrency(share.originalPrice)}
                  </p>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs text-theme-textSecondary mb-1">Order Range</p>
                <p className="text-lg font-bold text-accent-green">
                  {share.minQuantity.toLocaleString()} - {share.maxQuantity.toLocaleString()}
                </p>
                <p className="text-xs text-theme-textSecondary">shares</p>
              </div>
            </div>
          </div>

          {/* Purchase Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Quantity Selection */}
              <div>
                <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                  Quantity to Purchase *
                </label>
                <div className="relative">
                  <FaCalculator className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-textSecondary" />
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                    className={`w-full pl-10 pr-4 py-3 bg-theme-bgSecondary border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-theme-textPrimary placeholder:text-theme-textMuted ${
                      isQuantityValid() ? 'border-theme-borderSecondary focus:border-primary' : 'border-red-400 focus:border-red-400'
                    }`}
                    min={share.minQuantity}
                    max={Math.min(share.maxQuantity, share.availableQuantity)}
                    required
                  />
                </div>
                {!isQuantityValid() && formData.quantity && (
                  <p className="text-xs text-red-400 mt-1">{getQuantityError()}</p>
                )}
                <p className="text-xs text-theme-textMuted mt-1">
                  Min: {share.minQuantity.toLocaleString()} | Max: {share.maxQuantity.toLocaleString()} | Available: {share.availableQuantity.toLocaleString()}
                </p>
              </div>

              {/* Total Amount Display */}
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-theme-textSecondary">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(formData.totalAmount)}
                  </span>
                </div>
                <div className="text-xs text-theme-textMuted">
                  {parseInt(formData.quantity) || 0} shares × ₹{share.pricePerShare.toLocaleString()} per share
                </div>
                {share.adminMargin && (
                  <div className="text-xs text-theme-textMuted mt-1">
                    (Includes admin margin of ₹{share.adminMargin} per share)
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Important Information */}
              <div className="bg-blue-400/5 rounded-xl p-4 border border-blue-400/20">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-theme-textPrimary mb-2">Important Information</h4>
                    <ul className="text-xs text-theme-textSecondary space-y-1">
                      <li>• Settlement will be completed in 2-3 business days</li>
                      <li>• All shares are verified and compliance-approved</li>
                      <li>• Delivery method: {share.deliveryMethod === 'demat' ? 'Electronic (Demat)' : 'Physical Certificates'}</li>
                      <li>• Payment instructions will be sent via email</li>
                      <li>• Supplier: {share.supplierName} (Rating: {share.supplierRating}/5)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-primary bg-theme-bgSecondary border border-theme-borderSecondary rounded focus:ring-primary focus:ring-2"
                    required
                  />
                  <div className="text-sm text-theme-textSecondary">
                    I agree to the terms and conditions of this purchase. I understand that this is a binding agreement and payment will be processed upon confirmation.
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
            disabled={isSubmitting || !isQuantityValid() || !formData.agreedToTerms}
            onClick={handleSubmit}
            className="flex-2 px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg transition-colors font-medium"
          >
            {isSubmitting ? 'Processing...' : `Purchase for ${formatCurrency(formData.totalAmount)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;

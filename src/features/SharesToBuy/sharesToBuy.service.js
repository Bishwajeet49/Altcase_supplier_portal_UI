import apiClient from '../../api/apiClient';

// Dummy data for approved shares available for purchase
// These represent shares that suppliers have posted and admin has approved with margins
const dummyApprovedShares = [
  {
    id: 'as1',
    companyName: 'Reliance Industries',
    shareType: 'Equity',
    sector: 'Oil & Gas',
    availableQuantity: 800, // Reduced from original 1000 (some already sold)
    originalQuantity: 1000,
    pricePerShare: 2520, // Admin added margin to original 2400
    originalPrice: 2400,
    adminMargin: 120, // ₹120 margin per share
    minQuantity: 100,
    maxQuantity: 500, // Maximum per purchase
    validity: '2024-08-15T17:00:00Z',
    description: 'High-quality Reliance Industries shares available for immediate purchase. Clean documentation and quick settlement.',
    deliveryMethod: 'demat',
    supplierName: 'Premium Shares Ltd.',
    supplierRating: 4.8,
    approvedAt: '2024-07-21T10:00:00Z',
    listedAt: '2024-07-21T12:00:00Z',
    viewCount: 45,
    interestedBuyers: 12,
    recentPurchases: [
      { quantity: 200, price: 2520, buyerType: 'Individual', purchasedAt: '2024-07-23T14:00:00Z' }
    ],
    tags: ['blue-chip', 'dividend-paying', 'large-cap'],
    compliance: {
      kycVerified: true,
      documentsComplete: true,
      regulatoryApproved: true
    }
  },
  {
    id: 'as2',
    companyName: 'TCS',
    shareType: 'Equity',
    sector: 'Information Technology',
    availableQuantity: 500,
    originalQuantity: 500,
    pricePerShare: 3900, // Admin added margin to original 3750
    originalPrice: 3750,
    adminMargin: 150,
    minQuantity: 50,
    maxQuantity: 250,
    validity: '2024-08-20T12:00:00Z',
    description: 'TCS shares from verified supplier. Employee stock options with clean documentation.',
    deliveryMethod: 'demat',
    supplierName: 'Tech Equity Partners',
    supplierRating: 4.9,
    approvedAt: '2024-07-19T09:00:00Z',
    listedAt: '2024-07-19T11:00:00Z',
    viewCount: 68,
    interestedBuyers: 18,
    recentPurchases: [],
    tags: ['tech-stock', 'growth', 'large-cap', 'esop'],
    compliance: {
      kycVerified: true,
      documentsComplete: true,
      regulatoryApproved: true
    }
  },
  {
    id: 'as3',
    companyName: 'HDFC Bank',
    shareType: 'Equity',
    sector: 'Banking',
    availableQuantity: 250, // Reduced from original 300
    originalQuantity: 300,
    pricePerShare: 1680, // Admin added margin to original 1580
    originalPrice: 1580,
    adminMargin: 100,
    minQuantity: 25,
    maxQuantity: 150,
    validity: '2024-08-10T18:00:00Z',
    description: 'HDFC Bank shares available for quick settlement. Banking sector leader.',
    deliveryMethod: 'physical',
    supplierName: 'Banking Securities Co.',
    supplierRating: 4.6,
    approvedAt: '2024-07-16T14:00:00Z',
    listedAt: '2024-07-16T16:00:00Z',
    viewCount: 32,
    interestedBuyers: 8,
    recentPurchases: [
      { quantity: 50, price: 1680, buyerType: 'HNI', purchasedAt: '2024-07-22T10:00:00Z' }
    ],
    tags: ['banking', 'dividend-paying', 'large-cap'],
    compliance: {
      kycVerified: true,
      documentsComplete: true,
      regulatoryApproved: true
    }
  },
  {
    id: 'as4',
    companyName: 'Infosys',
    shareType: 'Equity',
    sector: 'Information Technology',
    availableQuantity: 600, // Reduced from original 750
    originalQuantity: 750,
    pricePerShare: 1520, // Admin added margin to original 1420
    originalPrice: 1420,
    adminMargin: 100,
    minQuantity: 100,
    maxQuantity: 300,
    validity: '2024-08-25T15:00:00Z',
    description: 'Infosys shares with all compliance documents. Flexible on bulk orders.',
    deliveryMethod: 'demat',
    supplierName: 'IT Shares Hub',
    supplierRating: 4.7,
    approvedAt: '2024-07-20T12:00:00Z',
    listedAt: '2024-07-20T14:00:00Z',
    viewCount: 41,
    interestedBuyers: 15,
    recentPurchases: [
      { quantity: 150, price: 1520, buyerType: 'Fund', purchasedAt: '2024-07-24T11:00:00Z' }
    ],
    tags: ['tech-stock', 'growth', 'large-cap'],
    compliance: {
      kycVerified: true,
      documentsComplete: true,
      regulatoryApproved: true
    }
  },
  {
    id: 'as5',
    companyName: 'Asian Paints',
    shareType: 'Equity',
    sector: 'Paints & Chemicals',
    availableQuantity: 200,
    originalQuantity: 200,
    pricePerShare: 3050, // Admin added margin to original 2850
    originalPrice: 2850,
    adminMargin: 200,
    minQuantity: 50,
    maxQuantity: 100,
    validity: '2024-08-18T16:00:00Z',
    description: 'Premium Asian Paints shares. Excellent track record and growth potential.',
    deliveryMethod: 'demat',
    supplierName: 'Chemical Equity Ltd.',
    supplierRating: 4.5,
    approvedAt: '2024-07-22T13:00:00Z',
    listedAt: '2024-07-22T15:00:00Z',
    viewCount: 28,
    interestedBuyers: 6,
    recentPurchases: [],
    tags: ['paints', 'consumer-goods', 'mid-cap'],
    compliance: {
      kycVerified: true,
      documentsComplete: true,
      regulatoryApproved: true
    }
  },
  {
    id: 'as6',
    companyName: 'Bajaj Finance',
    shareType: 'Equity',
    sector: 'Financial Services',
    availableQuantity: 300, // Reduced from original 400
    originalQuantity: 400,
    pricePerShare: 7100, // Admin added margin to original 6750
    originalPrice: 6750,
    adminMargin: 350,
    minQuantity: 25,
    maxQuantity: 150,
    validity: '2024-08-30T14:00:00Z',
    description: 'High-value Bajaj Finance shares. Premium NBFC with strong fundamentals.',
    deliveryMethod: 'demat',
    supplierName: 'Finance Shares Pro',
    supplierRating: 4.9,
    approvedAt: '2024-07-23T16:00:00Z',
    listedAt: '2024-07-23T18:00:00Z',
    viewCount: 52,
    interestedBuyers: 20,
    recentPurchases: [
      { quantity: 100, price: 7100, buyerType: 'HNI', purchasedAt: '2024-07-24T16:00:00Z' }
    ],
    tags: ['nbfc', 'high-growth', 'large-cap', 'premium'],
    compliance: {
      kycVerified: true,
      documentsComplete: true,
      regulatoryApproved: true
    }
  },
  {
    id: 'as7',
    companyName: 'Wipro',
    shareType: 'Equity',
    sector: 'Information Technology',
    availableQuantity: 400,
    originalQuantity: 400,
    pricePerShare: 480, // Admin added margin to original 450
    originalPrice: 450,
    adminMargin: 30,
    minQuantity: 50,
    maxQuantity: 200,
    validity: '2024-08-12T17:00:00Z',
    description: 'Wipro shares at attractive valuation. IT services company with global presence.',
    deliveryMethod: 'demat',
    supplierName: 'Tech Equity Partners',
    supplierRating: 4.8,
    approvedAt: '2024-07-18T10:00:00Z',
    listedAt: '2024-07-18T12:00:00Z',
    viewCount: 35,
    interestedBuyers: 11,
    recentPurchases: [],
    tags: ['tech-stock', 'value', 'large-cap'],
    compliance: {
      kycVerified: true,
      documentsComplete: true,
      regulatoryApproved: true
    }
  },
  {
    id: 'as8',
    companyName: 'Maruti Suzuki',
    shareType: 'Equity',
    sector: 'Automobile',
    availableQuantity: 150,
    originalQuantity: 200,
    pricePerShare: 10800, // Admin added margin to original 10500
    originalPrice: 10500,
    adminMargin: 300,
    minQuantity: 10,
    maxQuantity: 50,
    validity: '2024-08-28T15:00:00Z',
    description: 'Maruti Suzuki shares from premium supplier. Auto sector leader.',
    deliveryMethod: 'demat',
    supplierName: 'Auto Shares Elite',
    supplierRating: 4.7,
    approvedAt: '2024-07-21T11:00:00Z',
    listedAt: '2024-07-21T13:00:00Z',
    viewCount: 29,
    interestedBuyers: 9,
    recentPurchases: [
      { quantity: 50, price: 10800, buyerType: 'Individual', purchasedAt: '2024-07-23T15:00:00Z' }
    ],
    tags: ['auto', 'market-leader', 'large-cap'],
    compliance: {
      kycVerified: true,
      documentsComplete: true,
      regulatoryApproved: true
    }
  }
];

class SharesToBuyService {
  async getApprovedShares() {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get('/api/v1/marketplace/approved-shares', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching approved shares:', error);
      // Return dummy data for development
      return {
        success: true,
        data: dummyApprovedShares
      };
    }
  }

  async purchaseShares(purchaseData) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.post('/api/v1/marketplace/purchase', purchaseData, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error purchasing shares:', error);
      // Simulate successful purchase for development
      return {
        success: true,
        data: {
          orderId: `ORD${Date.now()}`,
          message: 'Purchase order placed successfully',
          estimatedSettlement: '2-3 business days'
        }
      };
    }
  }

  async expressInterest(shareId, contactInfo) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.post(`/api/v1/marketplace/shares/${shareId}/interest`, contactInfo, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error expressing interest:', error);
      return {
        success: true,
        message: 'Interest registered successfully'
      };
    }
  }

  async getMarketplaceStats() {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get('/api/v1/marketplace/stats', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching marketplace stats:', error);
      // Return dummy stats for development
      return {
        success: true,
        data: {
          total_shares_available: 8,
          total_quantity_available: 3200,
          total_value_available: 15840000, // Total value in INR
          active_suppliers: 6,
          recent_transactions: 5,
          avg_completion_time: '2.5 days'
        }
      };
    }
  }
}

const sharesToBuyService = new SharesToBuyService();
export default sharesToBuyService;

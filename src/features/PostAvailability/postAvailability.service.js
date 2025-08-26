import apiClient from '../../api/apiClient';

// Dummy data for development
const dummyAvailabilities = [
  {
    id: 'a1',
    companyName: 'Reliance Industries',
    shareType: 'Equity',
    sector: 'Oil & Gas',
    quantity: 1000,
    pricePerShare: 2400,
    minQuantity: 100,
    validity: '2024-08-15T17:00:00Z',
    description: 'High-quality Reliance Industries shares available for immediate sale. Willing to negotiate on bulk orders.',
    deliveryMethod: 'demat',
    status: 'active',
    postedAt: '2024-07-20T10:00:00Z',
    viewCount: 15,
    inquiries: 3,
    offers: [
      { id: 'o1', buyerName: 'Investor A', quantity: 500, offeredPrice: 2380, status: 'pending', createdAt: '2024-07-22T14:00:00Z' },
      { id: 'o2', buyerName: 'Investor B', quantity: 200, offeredPrice: 2390, status: 'accepted', createdAt: '2024-07-21T16:30:00Z' }
    ]
  },
  {
    id: 'a2',
    companyName: 'TCS',
    shareType: 'Equity',
    sector: 'Information Technology',
    quantity: 500,
    pricePerShare: 3750,
    minQuantity: 50,
    validity: '2024-08-20T12:00:00Z',
    description: 'TCS shares from employee stock options. Clean documentation available.',
    deliveryMethod: 'demat',
    status: 'sold',
    postedAt: '2024-07-18T09:00:00Z',
    viewCount: 28,
    inquiries: 8,
    soldAt: '2024-07-23T11:00:00Z',
    soldPrice: 3760,
    soldQuantity: 500,
    offers: [
      { id: 'o3', buyerName: 'Fund Manager X', quantity: 500, offeredPrice: 3760, status: 'accepted', createdAt: '2024-07-23T10:00:00Z' }
    ]
  },
  {
    id: 'a3',
    companyName: 'HDFC Bank',
    shareType: 'Equity',
    sector: 'Banking',
    quantity: 300,
    pricePerShare: 1580,
    minQuantity: 25,
    validity: '2024-08-10T18:00:00Z',
    description: 'HDFC Bank shares available. Quick settlement preferred.',
    deliveryMethod: 'physical',
    status: 'expired',
    postedAt: '2024-07-15T14:00:00Z',
    viewCount: 12,
    inquiries: 2,
    offers: []
  },
  {
    id: 'a4',
    companyName: 'Infosys',
    shareType: 'Equity',
    sector: 'Information Technology',
    quantity: 750,
    pricePerShare: 1420,
    minQuantity: 100,
    validity: '2024-08-25T15:00:00Z',
    description: 'Infosys shares with all compliance documents. Flexible on pricing for bulk orders.',
    deliveryMethod: 'demat',
    status: 'active',
    postedAt: '2024-07-19T11:00:00Z',
    viewCount: 22,
    inquiries: 5,
    offers: [
      { id: 'o4', buyerName: 'Investment Firm Y', quantity: 300, offeredPrice: 1410, status: 'pending', createdAt: '2024-07-24T09:00:00Z' },
      { id: 'o5', buyerName: 'Private Investor', quantity: 150, offeredPrice: 1415, status: 'rejected', createdAt: '2024-07-23T15:00:00Z' }
    ]
  },
  {
    id: 'a5',
    companyName: 'Asian Paints',
    shareType: 'Equity',
    sector: 'Paints & Chemicals',
    quantity: 200,
    pricePerShare: 2850,
    minQuantity: 50,
    validity: '2024-08-18T16:00:00Z',
    description: 'Premium Asian Paints shares. Excellent track record.',
    deliveryMethod: 'demat',
    status: 'paused',
    postedAt: '2024-07-21T13:00:00Z',
    viewCount: 8,
    inquiries: 1,
    offers: []
  },
  {
    id: 'a6',
    companyName: 'Bajaj Finance',
    shareType: 'Equity',
    sector: 'Financial Services',
    quantity: 400,
    pricePerShare: 6750,
    minQuantity: 25,
    validity: '2024-08-30T14:00:00Z',
    description: 'High-value Bajaj Finance shares. Serious buyers only.',
    deliveryMethod: 'demat',
    status: 'active',
    postedAt: '2024-07-22T16:00:00Z',
    viewCount: 35,
    inquiries: 12,
    offers: [
      { id: 'o6', buyerName: 'Mutual Fund Z', quantity: 400, offeredPrice: 6720, status: 'pending', createdAt: '2024-07-24T12:00:00Z' },
      { id: 'o7', buyerName: 'HNI Investor', quantity: 200, offeredPrice: 6740, status: 'pending', createdAt: '2024-07-24T14:30:00Z' }
    ]
  }
];

class PostAvailabilityService {
  async getAvailabilities() {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get('/api/v1/supplier/availabilities', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      // Return dummy data for development
      return {
        success: true,
        data: dummyAvailabilities
      };
    }
  }

  async createAvailability(availabilityData) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.post('/api/v1/supplier/availabilities', availabilityData, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating availability:', error);
      // Simulate successful creation for development
      const newAvailability = {
        id: `a${Date.now()}`,
        ...availabilityData,
        status: 'active',
        postedAt: new Date().toISOString(),
        viewCount: 0,
        inquiries: 0,
        offers: []
      };
      return {
        success: true,
        data: newAvailability
      };
    }
  }

  async updateAvailabilityStatus(availabilityId, status) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.patch(`/api/v1/supplier/availabilities/${availabilityId}/status`, 
        { status }, 
        {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ',
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating availability status:', error);
      return {
        success: true,
        message: 'Status updated successfully'
      };
    }
  }

  async deleteAvailability(availabilityId) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.delete(`/api/v1/supplier/availabilities/${availabilityId}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting availability:', error);
      return {
        success: true,
        message: 'Availability deleted successfully'
      };
    }
  }

  async getAvailabilityStats() {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get('/api/v1/supplier/availability-stats', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching availability stats:', error);
      // Return dummy stats for development
      return {
        success: true,
        data: {
          total_posts: 6,
          active_posts: 3,
          sold_posts: 1,
          expired_posts: 1,
          paused_posts: 1,
          total_inquiries: 31,
          pending_offers: 4,
          accepted_offers: 2,
          rejected_offers: 1
        }
      };
    }
  }
}

const postAvailabilityService = new PostAvailabilityService();
export default postAvailabilityService;

import apiClient from '../api/apiClient';

// Dummy data for development
const dummyQuotes = [
  {
    id: 'q1',
    demand: {
      id: 'd1',
      companyName: 'TechCorp Solutions',
      sector: 'Technology',
      expectedPrice: 150000,
      quantity: 1000,
      expectedTat: '7 days'
    },
    price: 145000,
    tat: '5 days',
    remarks: 'Competitive pricing with faster delivery',
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'q2',
    demand: {
      id: 'd2',
      companyName: 'Green Energy Ltd',
      sector: 'Renewable Energy',
      expectedPrice: 250000,
      quantity: 500,
      expectedTat: '10 days'
    },
    price: 240000,
    tat: '8 days',
    remarks: 'Premium quality with extended warranty',
    status: 'accepted',
    submittedAt: '2024-01-10T14:20:00Z'
  },
  {
    id: 'q3',
    demand: {
      id: 'd3',
      companyName: 'PharmaCare Inc',
      sector: 'Healthcare',
      expectedPrice: 180000,
      quantity: 2000,
      expectedTat: '15 days'
    },
    price: 175000,
    tat: '12 days',
    remarks: 'Bulk discount applied',
    status: 'rejected',
    submittedAt: '2024-01-08T09:15:00Z'
  },
  {
    id: 'q4',
    demand: {
      id: 'd4',
      companyName: 'AutoParts Manufacturing',
      sector: 'Automotive',
      expectedPrice: 320000,
      quantity: 800,
      expectedTat: '12 days'
    },
    price: 310000,
    tat: '10 days',
    remarks: 'Quality assured with ISO certification',
    status: 'pending',
    submittedAt: '2024-01-12T16:45:00Z'
  }
];

const dummyDemands = [
  {
    id: 'md1',
    companyName: 'My Company Ltd',
    sector: 'Manufacturing',
    expectedPrice: 200000,
    quantity: 1500,
    expectedTat: '8 days',
    status: 'active',
    postedAt: '2024-01-14T11:00:00Z',
    viewCount: 45,
    inquiries: 12,
    offers: [
      { 
        id: 'o1', 
        supplier: 'Supplier A', 
        price: 195000, 
        tat: '7 days',
        remarks: 'Competitive pricing with quality assurance',
        status: 'pending',
        submittedAt: '2024-01-15T10:30:00Z'
      },
      { 
        id: 'o2', 
        supplier: 'Supplier B', 
        price: 190000, 
        tat: '6 days',
        remarks: 'Premium quality with extended warranty',
        status: 'accepted',
        submittedAt: '2024-01-14T14:20:00Z'
      },
      {
        id: 'o3',
        supplier: 'Supplier C',
        price: 185000,
        tat: '9 days',
        remarks: 'Bulk discount applied for large quantity',
        status: 'pending',
        submittedAt: '2024-01-16T09:15:00Z'
      }
    ]
  },
  {
    id: 'md2',
    companyName: 'My Company Ltd',
    sector: 'Electronics',
    expectedPrice: 180000,
    quantity: 800,
    expectedTat: '6 days',
    status: 'completed',
    postedAt: '2024-01-10T09:30:00Z',
    viewCount: 32,
    inquiries: 8,
    offers: [
      { 
        id: 'o4', 
        supplier: 'Supplier D', 
        price: 175000, 
        tat: '5 days',
        remarks: 'Fast delivery with quality guarantee',
        status: 'accepted',
        submittedAt: '2024-01-11T11:45:00Z'
      }
    ]
  },
  {
    id: 'md3',
    companyName: 'My Company Ltd',
    sector: 'Construction',
    expectedPrice: 450000,
    quantity: 2500,
    expectedTat: '14 days',
    status: 'cancelled',
    postedAt: '2024-01-05T15:20:00Z',
    viewCount: 28,
    inquiries: 5,
    offers: []
  }
];

class MyQuotesService {
  /**
   * Fetch user's submitted quotes
   * @returns {Promise<Object>} Promise that resolves to the quotes data
   */
  async getMyQuotes() {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get('/api/v1/supplier/quotes', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching my quotes:', error);
      // Return dummy data for development
      return {
        success: true,
        data: dummyQuotes
      };
    }
  }

  /**
   * Fetch user's created demands
   * @returns {Promise<Object>} Promise that resolves to the demands data
   */
  async getMyDemands() {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get('/api/v1/supplier/my-demands', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching my demands:', error);
      // Return dummy data for development
      return {
        success: true,
        data: dummyDemands
      };
    }
  }

  /**
   * Fetch statistics for quotes and demands
   * @returns {Promise<Object>} Promise that resolves to the stats data
   */
  async getStats() {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get('/api/v1/supplier/quotes-demands-stats', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Calculate stats from dummy data for development
      const totalQuotes = dummyQuotes.length;
      const pendingQuotes = dummyQuotes.filter(q => q.status === 'pending').length;
      const acceptedQuotes = dummyQuotes.filter(q => q.status === 'accepted').length;
      const rejectedQuotes = dummyQuotes.filter(q => q.status === 'rejected').length;
      
      const totalDemands = dummyDemands.length;
      const activeDemands = dummyDemands.filter(d => d.status === 'active').length;
      const completedDemands = dummyDemands.filter(d => d.status === 'completed').length;
      const cancelledDemands = dummyDemands.filter(d => d.status === 'cancelled').length;

      return {
        success: true,
        data: {
          totalQuotes,
          pendingQuotes,
          acceptedQuotes,
          rejectedQuotes,
          totalDemands,
          activeDemands,
          completedDemands,
          cancelledDemands
        }
      };
    }
  }

  /**
   * Get quote details by ID
   * @param {string} quoteId - The ID of the quote
   * @returns {Promise<Object>} Promise that resolves to the quote details
   */
  async getQuoteDetails(quoteId) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get(`/api/v1/supplier/quotes/${quoteId}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching quote details:', error);
      // Return dummy quote for development
      const quote = dummyQuotes.find(q => q.id === quoteId);
      return {
        success: true,
        data: quote || null
      };
    }
  }

  /**
   * Accept an offer for a demand
   * @param {string} demandId - The ID of the demand
   * @param {string} offerId - The ID of the offer to accept
   * @returns {Promise<Object>} Promise that resolves to the acceptance result
   */
  async acceptOffer(demandId, offerId) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.put(`/api/v1/supplier/demands/${demandId}/offers/${offerId}/accept`, {}, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error accepting offer:', error);
      // Simulate successful acceptance for development
      return {
        success: true,
        message: 'Offer accepted successfully',
        acceptedAt: new Date().toISOString()
      };
    }
  }

  /**
   * Reject an offer for a demand
   * @param {string} demandId - The ID of the demand
   * @param {string} offerId - The ID of the offer to reject
   * @returns {Promise<Object>} Promise that resolves to the rejection result
   */
  async rejectOffer(demandId, offerId) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.put(`/api/v1/supplier/demands/${demandId}/offers/${offerId}/reject`, {}, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error rejecting offer:', error);
      // Simulate successful rejection for development
      return {
        success: true,
        message: 'Offer rejected successfully',
        rejectedAt: new Date().toISOString()
      };
    }
  }

  /**
   * Get demand details by ID
   * @param {string} demandId - The ID of the demand
   * @returns {Promise<Object>} Promise that resolves to the demand details
   */
  async getDemandDetails(demandId) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get(`/api/v1/supplier/my-demands/${demandId}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching demand details:', error);
      // Return dummy demand for development
      const demand = dummyDemands.find(d => d.id === demandId);
      return {
        success: true,
        data: demand || null
      };
    }
  }
}

export default new MyQuotesService();

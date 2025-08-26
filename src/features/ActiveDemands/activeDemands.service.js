import apiClient from '../../api/apiClient';

class ActiveDemandsService {
  /**
   * Fetch all active demands from Altcase
   * @returns {Promise<Object>} Promise that resolves to the demands data
   */
  async getActiveDemands() {
    try {
      // TODO: Replace with actual API endpoint when backend is ready
      const response = await apiClient.get('/api/v1/supplier/demands/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active demands:', error);
      // Return dummy data for development
      return this.getDummyDemands();
    }
  }

  /**
   * Submit a quote for a specific demand
   * @param {string} demandId - The ID of the demand
   * @param {Object} quoteData - Quote details (price, tat, remarks)
   * @returns {Promise<Object>} Promise that resolves to the submission result
   */
  async submitQuote(demandId, quoteData) {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.post(`/api/v1/supplier/demands/${demandId}/quote`, quoteData);
      return response.data;
    } catch (error) {
      console.error('Error submitting quote:', error);
      // Simulate successful submission for development
      return {
        success: true,
        message: 'Quote submitted successfully',
        quoteId: `quote_${Date.now()}`,
        submittedAt: new Date().toISOString()
      };
    }
  }

  /**
   * Get dummy data for development
   * @returns {Object} Dummy demands data
   */
  getDummyDemands() {
    return {
      success: true,
      data: {
        demands: [
          {
            id: 'DEM001',
            companyName: 'Reliance Industries Ltd',
            shareType: 'Equity Shares',
            quantity: 1000,
            expectedPrice: 2450,
            maxPrice: 2500,
            currency: 'INR',
            expectedTat: '7 days',
            priority: 'High',
            description: 'Looking for Reliance Industries equity shares for institutional client portfolio.',
            requirements: [
              'Valid share certificates',
              'Clear title',
              'No litigation issues'
            ],
            postedBy: 'Altcase Trading Desk',
            postedAt: '2024-01-15T10:30:00Z',
            expiresAt: '2024-01-22T23:59:59Z',
            status: 'Active',
            quotesReceived: 3,
            sector: 'Oil & Gas',
            marketCap: 'Large Cap'
          },
          {
            id: 'DEM002',
            companyName: 'Tata Consultancy Services',
            shareType: 'Equity Shares',
            quantity: 500,
            expectedPrice: 3800,
            maxPrice: 3900,
            currency: 'INR',
            expectedTat: '5 days',
            priority: 'Medium',
            description: 'TCS shares needed for client diversification strategy.',
            requirements: [
              'Dematerialized shares preferred',
              'Recent valuation certificate',
              'Compliance documentation'
            ],
            postedBy: 'Altcase Investment Team',
            postedAt: '2024-01-14T14:20:00Z',
            expiresAt: '2024-01-21T23:59:59Z',
            status: 'Active',
            quotesReceived: 5,
            sector: 'Information Technology',
            marketCap: 'Large Cap'
          },
          {
            id: 'DEM003',
            companyName: 'HDFC Bank Ltd',
            shareType: 'Equity Shares',
            quantity: 750,
            expectedPrice: 1650,
            maxPrice: 1700,
            currency: 'INR',
            expectedTat: '10 days',
            priority: 'Low',
            description: 'HDFC Bank shares for long-term investment portfolio.',
            requirements: [
              'Physical or demat form acceptable',
              'Proper documentation',
              'Transfer forms if physical'
            ],
            postedBy: 'Altcase Wealth Management',
            postedAt: '2024-01-13T09:15:00Z',
            expiresAt: '2024-01-27T23:59:59Z',
            status: 'Active',
            quotesReceived: 2,
            sector: 'Banking',
            marketCap: 'Large Cap'
          },
          {
            id: 'DEM004',
            companyName: 'Infosys Limited',
            shareType: 'Equity Shares',
            quantity: 300,
            expectedPrice: 1450,
            maxPrice: 1500,
            currency: 'INR',
            expectedTat: '3 days',
            priority: 'Urgent',
            description: 'Urgent requirement for Infosys shares for client exit strategy.',
            requirements: [
              'Immediate delivery required',
              'Demat form only',
              'All compliance documents'
            ],
            postedBy: 'Altcase Execution Desk',
            postedAt: '2024-01-16T16:45:00Z',
            expiresAt: '2024-01-19T23:59:59Z',
            status: 'Active',
            quotesReceived: 1,
            sector: 'Information Technology',
            marketCap: 'Large Cap'
          },
          {
            id: 'DEM005',
            companyName: 'Asian Paints Ltd',
            shareType: 'Equity Shares',
            quantity: 200,
            expectedPrice: 3200,
            maxPrice: 3300,
            currency: 'INR',
            expectedTat: '14 days',
            priority: 'Medium',
            description: 'Asian Paints shares for sectoral diversification.',
            requirements: [
              'Good condition certificates',
              'Proper endorsements',
              'Tax clearances'
            ],
            postedBy: 'Altcase Portfolio Team',
            postedAt: '2024-01-12T11:30:00Z',
            expiresAt: '2024-01-26T23:59:59Z',
            status: 'Active',
            quotesReceived: 4,
            sector: 'Paints & Chemicals',
            marketCap: 'Large Cap'
          },
          {
            id: 'DEM006',
            companyName: 'Bajaj Finance Ltd',
            shareType: 'Equity Shares',
            quantity: 400,
            expectedPrice: 6800,
            maxPrice: 7000,
            currency: 'INR',
            expectedTat: '6 days',
            priority: 'High',
            description: 'Bajaj Finance shares for NBFC sector exposure.',
            requirements: [
              'Clean title documents',
              'Recent share certificates',
              'KYC compliance'
            ],
            postedBy: 'Altcase Research Team',
            postedAt: '2024-01-15T13:20:00Z',
            expiresAt: '2024-01-23T23:59:59Z',
            status: 'Active',
            quotesReceived: 6,
            sector: 'Financial Services',
            marketCap: 'Large Cap'
          }
        ],
        totalCount: 6,
        activeCount: 6,
        pagination: {
          page: 1,
          limit: 10,
          total: 6,
          totalPages: 1
        }
      }
    };
  }
}

export default new ActiveDemandsService();

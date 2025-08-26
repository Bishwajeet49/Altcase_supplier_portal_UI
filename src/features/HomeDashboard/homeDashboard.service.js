import apiClient from '../../api/apiClient';

class HomeDashboardService {
  /**
   * Fetch event statistics from the API
   * @returns {Promise<Object>} Promise that resolves to the stats data
   */
  async getEventStats() {
    try {
      const response = await apiClient.get('/api/v1/events/stats', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching event stats:', error);
      throw error;
    }
  }

  /**
   * Fetch supplier statistics from the API
   * @returns {Promise<Object>} Promise that resolves to the supplier stats data
   */
  async getSupplierStats() {
    try {
      const response = await apiClient.get('/api/v1/supplier/stats', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDA1OTBlZjAtOGQ1MC00YzdlLWIzZDMtZDc4MGQ1YmU2M2FmIiwiZW1haWwiOiJ0cmlwYXRoaS5sb2t5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTG9rcGF0aVRyaXBhdGhpIiwicm9sZXMiOlsiYWRtaW4iLCJvcmdhbml6ZXIiXSwicGVybWlzc2lvbnMiOlsiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuam9pbiIsImV2ZW50cy5sZWF2ZSIsImV2ZW50cy5yZWFkIiwiZXZlbnRzLnVwZGF0ZSIsInByb2ZpbGUudXBkYXRlIiwicm9sZXMuY3JlYXRlIiwicm9sZXMuZGVsZXRlIiwicm9sZXMucmVhZCIsInJvbGVzLnVwZGF0ZSIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmRlbGV0ZSIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiXSwiaWF0IjoxNzUzMzQ1MzQ0LCJleHAiOjE3NTM0MzE3NDR9.kLIMLhMWuDV1pr0JTX_oE-QNLgTy5p5QW4GRsvA7RiQ'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching supplier stats:', error);
      throw error;
    }
  }
}

export default new HomeDashboardService();

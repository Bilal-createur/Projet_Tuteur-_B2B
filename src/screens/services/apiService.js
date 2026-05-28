// src/services/apiService.js
const BASE_URL = 'http://10.0.2.2:8080/api';

export const apiClient = {
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error("Erreur API :", error);
      throw error;
    }
  },
};
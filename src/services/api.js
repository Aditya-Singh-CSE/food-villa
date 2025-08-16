// Base API configuration and utilities
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Create headers with auth token
export const createAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `${token}` : '',
  };
};

// Base API POST request function
export const apiPostRequest = async (endpoint, payload = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    method: 'POST',
    headers: createAuthHeaders(),
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API POST request failed for ${endpoint}:`, error);
    throw error;
  }
};

export default apiPostRequest;

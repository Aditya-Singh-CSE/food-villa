// const API_URL = "https://food-villa-backend-zf7db.sevalla.app/execute/command";   // <-- change once
const API_URL = "http://localhost:8080/execute/command";

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

export const httpPost = async (endpoint, body) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers:  createAuthHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
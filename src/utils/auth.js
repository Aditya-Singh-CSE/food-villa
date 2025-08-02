// Auth utility functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const getUserRole = () => {
  return localStorage.getItem('userRole') || null;
};

export const setUserRole = (role) => {
  if (role) {
    localStorage.setItem('userRole', role);
  } else {
    localStorage.removeItem('userRole');
  }
};

export const clearAuthData = () => {
  removeAuthToken();
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
};

import { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAuthToken, 
  setAuthToken, 
  removeAuthToken, 
  getUserRole, 
  setUserRole as setRoleInStorage,
  clearAuthData
} from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const initializeAuth = () => {
      const token = getAuthToken();
      if (token) {
        try {
          const userEmail = localStorage.getItem('userEmail') || 'User';
          const role = getUserRole() || 'user';
          
          setUser({ 
            email: userEmail,
            role: role 
          });
          setCurrentUserRole(role);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error initializing auth:', error);
          clearAuthData();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (authData) => {
    try {
      if (authData?.token) {
        setAuthToken(authData.token);
        const email = authData.email || 'User';
        const role = authData.role || 'user';
        
        // Save user data to localStorage
        localStorage.setItem('userEmail', email);
        setRoleInStorage(role);
        
        // Update state
        setUser({ 
          email,
          role
        });
        setCurrentUserRole(role);
        setIsAuthenticated(true);
      }
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Clear all auth related data
    clearAuthData();
    
    // Reset all auth state
    setUser(null);
    setCurrentUserRole(null);
    setIsAuthenticated(false);
    
    // Redirect to home page after logout
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      userRole: currentUserRole,
      isStudent: currentUserRole === 'student',
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/image/Logo.png";
import useOnline from "../hooks/useOnline";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";
import AuthModal from "./auth/AuthModal";
//import "./Header.css";

const Title = () => (
  <a href="/" className="block" onClick={(e) => {
    // Force a full page reload when clicking the logo
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.location.href = '/';
    }
  }}>
    <img
      data-testid="logo"
      className="h-28 p-2"
      alt="logo"
      src={Logo}
      // src="https://t1.gstatic.com/images?q=tbn:ANd9GcTsFA_WDM7tGA5t-3uQ8VwxLTxVD2fwELRn_QHRJ7hwxoWU5MHI"
    />
  </a>
);

// SPA Single Page Application ??
// Client Side Routing
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login'); // 'login' or 'signup'

  const isOnline = useOnline();
  const { user } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleAuthClick = (type = 'login') => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  console.log("Header is Rendered");
  return (
    <div className="w-full bg-pink-50 shadow-lg sm:bg-blue-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Title />
          <div className="w-full sm:w-auto">
            <ul className="flex flex-wrap items-center justify-center sm:justify-end py-2 sm:py-4">
              <li className="px-2 py-1">
                <a href="/" onClick={(e) => {
                  // Force a full page reload when already on home
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    window.location.href = '/';
                  }
                }}>Home</a>
              </li>
              <li className="px-2 py-1">
                <Link to="/about">About</Link>
              </li>
              {/* <li className="px-2 py-1">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="px-2 py-1">
                <Link to="/instamart">Instamart</Link>
              </li> */}
              <li className="px-2 py-1">
                <Link to="/cart" data-testid="cart">Cart - {cartItems.length}</Link>
              </li>
              {/* <li className="px-2 py-1">
                <span data-testid="online-status">{isOnline ? "🟢" : "🔴"}</span>
              </li> */}
              {/* <li className="px-2 py-1">
                <span className="font-bold text-red-900">{user.name}</span>
              </li> */}
              <li className="px-2 py-1">
                {isLoggedIn ? (
                  <span 
                    className="px-3 py-1 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Logout
                  </span>
                ) : (
                  <span 
                    className="px-3 py-1 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => handleAuthClick('login')}
                  >
                    Login
                  </span>
                )}
              </li>
              {!isLoggedIn && (
                <li className="px-2 py-1">
                  <span 
                    className="px-3 py-1 rounded cursor-pointer bg-pink-600 text-white hover:bg-pink-700"
                    onClick={() => handleAuthClick('signup')}
                  >
                    Sign up
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        type={authType}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Header;

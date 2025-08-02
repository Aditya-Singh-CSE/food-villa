import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/image/Logo.png";
import useOnline from "../hooks/useOnline";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";
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

  const isOnline = useOnline();

  const { user } = useContext(UserContext);

  //Subscrbe the store
  const cartItems = useSelector((store) => store.cart.items);

  // Log the length of cartItems
  console.log("Length of cartItems:", cartItems.length); // Added console log
  // console.log(cartItems)

  useEffect(() => {
    console.log("useEffect");
  }, []);

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
              <li className="px-2 py-1">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="px-2 py-1">
                <Link to="/instamart">Instamart</Link>
              </li>
              <li className="px-2 py-1">
                <Link to="/cart" data-testid="cart">Cart - {cartItems.length} items</Link>
              </li>
              <li className="px-2 py-1">
                <span data-testid="online-status">{isOnline ? "🟢" : "🔴"}</span>
              </li>
              <li className="px-2 py-1">
                <span className="font-bold text-red-900">{user.name}</span>
              </li>
              <li className="px-2 py-1">
                {isLoggedIn ? (
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" 
                          onClick={() => setIsLoggedIn(false)}>
                    Logout
                  </button>
                ) : (
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          onClick={() => setIsLoggedIn(true)}>
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

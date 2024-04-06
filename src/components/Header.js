import { useState } from "react";
import "./Header.css";

const Title = () => (
  <a href="/">
    <img
      className="logo"
      alt="logo"
      src="https://t1.gstatic.com/images?q=tbn:ANd9GcTsFA_WDM7tGA5t-3uQ8VwxLTxVD2fwELRn_QHRJ7hwxoWU5MHI"
    />
  </a>
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
          {isLoggedIn ? (
            <button className="login" onClick={() => setIsLoggedIn(false)}>
              Logout
            </button>
          ) : (
            <button className="login" onClick={() => setIsLoggedIn(true)}>
              Login
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

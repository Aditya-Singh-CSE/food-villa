import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Logo from "./assets/image/Logo.png";
import useOnline from "../hooks/useOnline";
import "./Header.css";

const Title = () => (
  <a href="/">
    <img
      className="logo"
      alt="logo"
      src = {Logo}
      // src="https://t1.gstatic.com/images?q=tbn:ANd9GcTsFA_WDM7tGA5t-3uQ8VwxLTxVD2fwELRn_QHRJ7hwxoWU5MHI"
    />
  </a>
);

// SPA Single Page Application ?? 
// Client Side Routing
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isOnline = useOnline();


  useEffect(()=>{
    console.log("useEffect")
  },[])

  console.log("Header is Rendered")
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          
          
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/contact">
              <li>Contact</li>
          </Link>
          <Link to="/instamart">
            <li>Instamart</li>
          </Link>
          
          <li>Cart</li>
          <div>{isOnline ?"🟢" :"🔴"}</div>
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

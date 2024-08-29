import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";


// SPA - Single Page Application
// Client Side Routing


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
  console.log("header render")

  // If no dependency array => useEffect is called on every render
  // If dependency array is empty = [] => useEffect is called on initial render(just once)
  // If dependency array is [isLoggedIn] => useEffect is called whenever isLoggedIn changes
 useEffect(()=>{
  console.log("useeffect called")
 },[isLoggedIn])


  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
         
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
       
         
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

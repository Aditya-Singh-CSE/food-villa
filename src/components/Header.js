import { useState, useEffect, useContext } from "react";
import {Link} from 'react-router-dom';
import Logo from "./assets/image/Logo.png";
import useOnline from "../hooks/useOnline";
import UserContext from "../context/UserContext";
//import "./Header.css";

const Title = () => (
  <a href="/">
    <img
      className="h-28 p-2"
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

  const { user } = useContext(UserContext);



  useEffect(()=>{
    console.log("useEffect")
  },[])

  console.log("Header is Rendered")
  return (
    <div className="flex justify-between bg-pink-50 shadow-lg sm:bg-blue-50">
      <Title />
      <div >
        <ul className="flex py-10">
          <Link to="/">
            <li className="px-2">Home</li>
          </Link>
          
          
          <Link to="/about">
            <li className="px-2">About</li>
          </Link>
          <Link to="/contact">
              <li className="px-2">Contact</li>
          </Link>
          <Link to="/instamart">
            <li className="px-2">Instamart</li>
          </Link>
          <Link to="/cart">
          <li className="px-2">Cart</li>
          </Link>
          
          <div>{isOnline ?"🟢" :"🔴"}</div>
          <span className=" font-bold text-red-900">{user.name}</span>
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

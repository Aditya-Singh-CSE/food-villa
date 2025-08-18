import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
//import { AppLayout } from './App';
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Shimmer from "./components/Shimmer";
import Cart from "./components/Cart";
import MerchantPage from "./components/merchants/MerchantPage";
import MerchantSignup from "./components/merchants/MerchantSignup";
import MerchantDashboard from "./components/merchants/MerchantDashboard";
import Checkout from "./components/Checkout";

// import RestrauntMenu from "./components/RestrauntMenu";
import RestaurantMenu from "./components/RestaurantMenu";
//import Instamart from './components/Instamart';
import Profile from "./components/Profile";
import RequireAuth from "./common/components/RequireAuth";
import { ROLES } from "./constants";
import Error from "./components/Error";
import UserContext from "./context/UserContext";
import { Provider } from "react-redux";
import LandingPage from "./components/LandingPage";
import store from "./utils/store";

const Instamart = lazy(() => import("./components/Instamart"));
// Upon On Demand Loading -> upon render -> suspend loading

//Do not lazy load a component inside another component
//Always on top just beow import statement

// Chunking
// Code Splitting
// Dynamic Bundling
// Lazy Loading
// On Demand Loading
// Dynamic Import

const AppLayout = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // fetch user data from backend
    // authenticate user
  }, []);

  return (
    <>
      <Provider store={store}>
        <UserContext.Provider
          value={{
            user: user,
            setUser: setUser,
          }}
        >
          <Header />
          {/* { Outlet } */}
          <Outlet />
          <Footer />
        </UserContext.Provider>
      </Provider>
    </>
  );
};

//Set the router configurations
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/restaurants",
        element: <Body />,
      },
      {
        path: "/merchant-signup",
        element: <MerchantSignup />,
      },
      {
        path: "/about", //  parentPath/{path} =>localhost:3000/about
        element: <About />,
        children: [
          {
            path: "profile", // parentPath/{path} =>localhost:3000/about/profile
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element:<Cart/>,
        errorElement: <Error />,
      },
      {
        path : "/checkout",
        element: <Checkout/>,
        errorElement: <Error />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/merchants",
    element: <MerchantPage />,
    errorElement: <Error />,
  },
  {
    path: "/merchant/dashboard",
    element: <MerchantDashboard />,
    errorElement: <Error />,
  },
  // {
  //   path: "/merchant/dashboard",
  //   element: <RequireAuth allowedRoles={[ROLES.Merchant]}>
  //     <Suspense fallback={<Shimmer />}>
  //       {React.createElement(require("./components/merchants/MerchantDashboard").default)}
  //     </Suspense>
  //   </RequireAuth>,
  //   errorElement: <Error />,
  // },
  {
    path: "/instamart",
    element: (
      <Suspense fallback={<Shimmer />}>
        <Instamart />
      </Suspense>
    ),
    errorElement: <Error />,
  },
 
  {
    path: "/notallowed",
    element: (
      <RequireAuth allowedRoles={[ROLES.Admin]}>
        <About />
      </RequireAuth>
    ), // Protect About page
    errorElement: <Error />,
  },
]);

export default router;

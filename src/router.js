import {  createBrowserRouter,Outlet } from 'react-router-dom';
import  { lazy, Suspense, useState,useEffect } from 'react';
//import { AppLayout } from './App';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Shimmer from './components/Shimmer';

import RestrauntMenu from './components/RestrauntMenu';
//import Instamart from './components/Instamart';
import Profile from "./components/Profile";
import RequireAuth from './common/components/RequireAuth';
import { ROLES } from './constants';
import Error from './components/Error';
import UserContext from './context/UserContext';

const Instamart = lazy(()=>import("./components/Instamart"));
// Upon On Demand Loading -> upon render -> suspend loading 

//Do not lazy load a component inside another component 
//Always on top just beow import statement


// Chunking
// Code Splitting
// Dynamic Bundling
// Lazy Loading
// On Demand Loading
// Dynamic Import



const AppLayout = () =>{


    const [user, setUser] = useState({
        name: "Aditya Singh",
        email:"supprt@namastedev.com",
    });

    useEffect(()=>{
        // fetch user data from backend
        // authenticate user
    },[]);

    return(
      <>
      <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }
      }
      >
      <Header/>
      {/* { Outlet } */}
      <Outlet/>
      <Footer/>
      </UserContext.Provider>
      </>
    );
  }


//Set the router configurations
const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        errorElement: <Error/>,
        children : [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path:"/about", //  parentPath/{path} =>localhost:3000/about
                element:<About/>,
                children:[
                    {
                        path: "profile", // parentPath/{path} =>localhost:3000/about/profile
                        element: <Profile/>
                    }
                ]
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path:"/restaurant/:id",
                element: <RestrauntMenu/>
            }
        ]
    },
    {
        path: '/login',
        element:  <Login/>,
        errorElement: <Error/>
    },
    {
        path: "/instamart",
        element: (<Suspense fallback={<Shimmer/>}>
            <Instamart/>
            </Suspense>),
        errorElement:<Error/>

    },
    {
        path: '/notallowed',
        element:  (
            <RequireAuth allowedRoles={[ROLES.Admin]}>
                <About/>
            </RequireAuth>
        ),// Protect About page
        errorElement: <Error/>
    }
]);

export default router;



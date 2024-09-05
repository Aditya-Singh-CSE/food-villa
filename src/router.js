import {  createBrowserRouter,Outlet } from 'react-router-dom';
//import { AppLayout } from './App';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import RestrauntMenu from './components/RestrauntMenu';
import RequireAuth from './common/components/RequireAuth';
import { ROLES } from './constants';
import Error from './components/Error';


const AppLayout = () =>{
    return(
      <>
      <Header/>
      {/* { Outlet } */}
      <Outlet/>
      <Footer/>
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
                path:"/about",
                element:<About/>,
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
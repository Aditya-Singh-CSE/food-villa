import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { IMG_CDN_URL } from "./constants";
import LandingPage from "./components/LandingPage.js";

/**
 *  Header
 *  - Logo
 *  - Nav Items (Right Side)
 *  - Cart
 *
 *  Body
 *  - SearchBar
 *  - Restaurant List
 *    - Restaurant Card
 *      - Image
 *      - Name
 *      - Rating
 *      - Cusines
 *
 *  Footer
 *  - links
 *  - Copyright
 *
 */

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;



// export const AppLayout = () =>{
//   return(
//     <>
//     <Header/>
//     {/* { Outlet } */}
//     <Outlet/>
//     <Footer/>
//     </>
//   );
// }

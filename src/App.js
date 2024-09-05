import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { Outlet } from 'react-router-dom';
import About from "./components/About";
import Contact from "./components/Contact";
import { IMG_CDN_URL } from "./constants";

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

function App() {
  console.log("App.js is called")
  return (
    <div>
      <Header />
      <Body />
      <Footer/>
    </div>
  );
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

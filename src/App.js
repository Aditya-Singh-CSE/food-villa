import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import { IMG_CDN_URL } from "./constants";
import { RouterProvider } from "react-router-dom";
import Main from "./components/Layout/AppLayout";
import appRouter from "./router";



// function App() {
//   return (
//     <RouterProvider router={appRouter}>
//       <Main/>
//     </RouterProvider>
//   );
// }

// export default App;

function App(){
  return(
    <>
    <Header/>
    <Body/>
    <Footer/>

    </>

  );
}
export default App;



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






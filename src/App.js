import "./App.css";
import "./index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
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
  return (
    <div>
      <Header />
      <Body />
      <Footer/>
    </div>
  );
}

export default App;

import Header from "../Header";
import Body from "../Body";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet/>
      {/* <Body /> */}
      <Footer />
    </div>
  );
}

export default AppLayout;
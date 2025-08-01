import Header from "../Header";
import { render,screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../utils/store.js";
import { StaticRouter } from "react-router-dom/server";


// Unit Testing
test("Logo should load on rendering header", () => {
   // Render the Header component
   render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  // Use screen to get elements
  const logo = screen.getAllByTestId("logo");
  console.log(logo);

  // Add assertions
  expect(logo[0].src).toBe("http://localhost/dummy.png");

});

// Unit Testing
test("Online Status should be green on rendering header", () => {
    //Render the Header Component
    render(
        <StaticRouter>
            <Provider store={store}>
                <Header/>
            </Provider>
        </StaticRouter>
    );

    //Use screen to get elements
    const onlineStatus = screen.getByTestId("online-status");

    //Add assertions
    expect(onlineStatus.innerHTML).toBe("🟢");

});

// Unit Testing
test("Cart should have 0 items on rendering header",()=>{
    //Render the Header Component
    render(
        <StaticRouter>
            <Provider store={store}>
                <Header/>
            </Provider>
        </StaticRouter>
    );

    //Use screen to get elements
    const cart = screen.getByTestId("cart");

    //Add assertions
    expect(cart.innerHTML).toBe("Cart - 0 items");

});

import Body from "../Body";
import { render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../utils/store";
import { StaticRouter } from "react-router-dom/server";
import { RESTAURANT_DATA } from "../../mocks/data";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      Promise.resolve(RESTAURANT_DATA);
    },
  });
});

test("Shimmer should load on HomePage", () => {
  render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );
  
  // Use screen to get elements
  const shimmer = screen.getByTestId("shimmer");

  // Add assertions
  expect(shimmer.childNodes.length).toBe(14);

  console.log(shimmer);
});



// test("Restaurants should load on Homepage", async () => {
//     render(
//         <StaticRouter>
//             <Provider store={store}>
//                 <Body />
//             </Provider>
//         </StaticRouter>
//     );

//     const searchBtn = await screen.findByTestId("search-btn");
//     expect(searchBtn).toBeInTheDocument();

//     const reslist = screen.getByTestId("shimmer");
//     expect(reslist.childNodes.length).toBe(14); // Corrected to 'toBe' instead of 'tobe'
// });

test("Restaurants should load on Homepage",async ()=>{
    render(
        <StaticRouter>
            <Provider store={store}>
                <Body/>
            </Provider>
        </StaticRouter>
    );

    // ... existing code ...
  // ... existing code ...
//   await waitFor(async () => {
//     const searchBtn = await screen.findByTestId("search-btn");
//     //expect(searchBtn).toBeInTheDocument();
// });
// ... existing code ...
// ... existing code ...

await waitFor(()=> expect(screen.getByTestId("search-btn")));
 

    const reslist = screen.getByTestId("shimmer");

    expect(reslist.childNodes.length).tobe(14);

    console.log(reslist);


});

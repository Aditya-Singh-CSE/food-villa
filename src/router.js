import About from "./components/About";
import AppLayout from "./components/Layout/AppLayout";
import RestrauntMenu from "./components/RestrauntMenu";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Error from "./components/Error";
import { createBrowserRouter } from "react-router-dom";

//Set configuration for router
const AppRouter = createBrowserRouter(
    [
        {
            path : "/",
            element : <AppLayout/>,
            errorElement: <Error/>,
            children :[
                {
                    path:"/",
                    element:<Body/>
                },
                {
                    path:"/about",
                    element:<About/>
                },
                {
                    path:"/contact",
                    element:<Contact/>
                },
                {
                    path:"/restraunt/:resId",
                    element:<RestrauntMenu/>
                }
            ]
        },
        {
            path:"/home",
            element:<AppLayout/>

        },
        // {
        //     path: "/about",
        //     element: <About/>
        // }
    ]
);

export default AppRouter;
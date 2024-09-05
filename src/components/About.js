import { Outlet } from "react-router-dom";
const About = () =>{
    return(
        <>
        <h1>About Us Page</h1>
        <p>This is the Namaste React Live course Chapter-07 - Finding the Pat</p>
        <Outlet/>
        </>
    );
}
export default About;
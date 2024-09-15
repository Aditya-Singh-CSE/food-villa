import { Outlet } from "react-router-dom";
import Profile from "./ProfileClass.js";
import ProfileFunctionComponenet from "./Profile.js";
import { Component } from 'react';
import UserContext from "../context/UserContext.js";

// const About2 = () =>{
//     return(
//         <>
//         <h1>About Us Page</h1>
//         <p>This is the Namaste React Live course Chapter-07 - Finding the Pat</p>
//         <ProfileFunctionComponenet name={"Aditya"}/>
//         <Profile name={"AdityaClass"} xyz={"XYZ"}/>
//         {/* <Outlet/> */}
//         </>
//     );
// }
// export default About2;


class About extends Component {

    constructor(props){
        super(props);  
        // console.log("Parent - constructor");
    }

    compoentDidMount(){
        // console.log("Parent -compoenetDidMount");
        //Best place to make API Call
    }

    //Research
    //We can make componentDidMount async but not make callback function on useEffect async why ?

    render(){
        // console.log("Parent -render")
        return(
            <>
            <h1>About Us Page</h1>

            <UserContext.Consumer>
                {({user})=>{
                    <h4 className="font-bold text-xl p-10">
                        {user.name} - {user.email}
                    </h4>
                }}
            </UserContext.Consumer>
            <p>This is the Namaste React Live course Chapter-07 - Finding the Pat</p>
            <ProfileFunctionComponenet name={"Aditya"}/>
            {/* <Profile name={"First Child"}/> */}
            {/* <Profile name={"Second Child"} /> */}
            {/* <Outlet/> */}
            </>
        );
    }

}

export default About;


//This is the sequence followed in class based compoent
/* Parent - constructor
   Parent - render
      First Child constructor
      First Child render
      Secons Child constructor
      Second Child render
      First Child component mount
      Second Child component mount
    Parent compoenent mount
   
*/

//Ques: Why we call api in compoentDidMount ?
//Ans: Because we want to call api only once UI is rendered. First render with initial value after that update its UI.
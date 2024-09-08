import { useState, useEffect } from "react";

const Profile = (props) =>{
    const [count, setCount] = useState(0);
    // console.log("render function")

    useEffect(()=>{
        // API Call
        console.log("useEffect");
        const timer = setInterval(()=>{
            console.log("Namaste Ract App")
        },1000)

        return () =>{
            console.log("clean up function");
            clearInterval(timer);
        };
    });

    console.log("renderProfile");

    return(
        <>
        <h2>Profie Component</h2>
        <h3>Name: {props.name}</h3>
        <h3>Count: {count}</h3>
        <button 
        onClick={()=>{
            setCount(1);
        }}>Count</button>
        </>
    );
};

export default Profile;
import React from 'react';

class Profile extends React.Component {

    // To initialise variable
    constructor(props){
        super(props);
        // Create State
        this.state = {
            userInfo: {
                name: "Dummy Name",
                location: "Dummy Location",
            }
        }

        console.log(" Child Constructor "  + this.props.name);
    }

    async componentDidMount() {
        // API Calls
        console.log(" Child componentDidMount " + this.props.name);
        const data = await fetch("https://api.github.com/users/Aditya-Singh-CSE");
        const json = await data.json();
        this.setState({
            userInfo : json,
        })
    }

    compoentDidUpdate(){
        console.log(" Child componentDidUpdate " + this.props.name);
    }

    componentWillUnmount(){
        console.log("Component unmount is called")
    }

    render() {
        const { count } = this.state; //Destructing
        console.log("Child render " + this.props.name)
        return( 
        <div>
            <h1>Profile Class Component</h1>
            <h2>Name : {this.state.userInfo.name}</h2>
            <img src={this.state.userInfo.avatar_url}/>
            <h2>Location: {this.state.userInfo.location}</h2>
            {/* <h2>Count: {this.props.count}</h2> */}
            {/* <h2>Count: {count}</h2>  */}
            {/* <button onClick={()=>{
                // WE DO NOT MUTATE STATE DIRCETLY
                // NEVER do this.state = something
                this.setState({
                    count : 1,
                    count2 : 2,
                });
            }}
            >
                SetCount
            </button> */}
        </div>
        );
    }

}

export default Profile;

//First constructor is called
//Then compoent is rendered 
//then componentDidMount called
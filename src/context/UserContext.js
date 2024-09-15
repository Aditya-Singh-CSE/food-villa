import { createContext } from 'react';

const UserContext = createContext({
    user:{
        name: "Dummy Name",
        email: "dummy@gmail.com",
    }
    
});

UserContext.displayName = "userContext"

export default UserContext;
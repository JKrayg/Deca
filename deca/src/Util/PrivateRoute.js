import React from "react";
import { Route, Redirect } from "react-router-dom";
import Moralis from "moralis";

function PrivateRoute({ component: RouteComponent, ...rest }){
    const currentUser = Moralis.User.current();
    // const token = currentUser.attributes.sessionToken;
    return (
        <Route 
            {...rest}
            render = {location =>
            !!currentUser ? (
             <RouteComponent {...location} />
        ) : (
            <Redirect to = {'/'} />
        )}
         />   
    );
}

export default PrivateRoute;

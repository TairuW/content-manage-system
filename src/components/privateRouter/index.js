import React from 'react';
import { Route, Redirect } from "react-router-dom";
// import { getToken } from "../../utils/cookies";

const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => (
            true ? <Component {...routeProps} /> : <Redirect to="/"/>
            // getToken() ? <Component {...routeProps} /> : <Redirect to="/"/>
        )} />
    );
}

export default PrivateRouter;
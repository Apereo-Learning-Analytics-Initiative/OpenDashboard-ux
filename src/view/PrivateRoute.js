import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Admin } from './admin/Admin';

export function PrivateRoute({ hasAccess, redirectPath, component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props) => (
            hasAccess === true
                ? <Admin><Component {...props} /></Admin>
                : <Redirect to={ redirectPath } />
        )} />
    );
}

export default PrivateRoute;
import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from './login/Login';
import Admin from './admin/Admin';

function UnauthenticatedApp() {
    return (
        <Admin>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Redirect path="/" to="/login" />
                </Switch>
            </Router>
        </Admin>
    );
}

export default UnauthenticatedApp;
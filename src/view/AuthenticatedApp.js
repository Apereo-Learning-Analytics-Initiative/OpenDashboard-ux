import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { ContentProviders, AdminProviders } from '../context';

import { useIsAdmin } from '../context/Authentication';
import AdminTenantList from './admin/tenant/AdminTenantList';
import AdminTenantDashboard from './admin/tenant/AdminTenantDashboard';

import { PrivateRoute } from './PrivateRoute';

import { Course } from './course/Course';
import NewTenant from './admin/tenant/NewTenant';
import Login from './login/Login';
import Admin from './admin/Admin';

const LOGIN_PATH = '/login';

function AuthenticatedApp() {

    const isAdmin = useIsAdmin();

    return (
        <ContentProviders>
            <AdminProviders>
            <Router>
                <Route path="/login" render={() => <Admin><Login /></Admin>} />
                <Route path="/courselist" component={ Course } />
                <Route exact path="/" render={() => <Redirect to="courselist" />} />
                
                <PrivateRoute path="/admin/tenant/:tenantId"
                    hasAccess={isAdmin}
                    redirectPath={LOGIN_PATH}
                    component={AdminTenantDashboard}>
                </PrivateRoute>

                <PrivateRoute path="/admin/tenants/new"
                    hasAccess={isAdmin}
                    redirectPath={LOGIN_PATH}
                    component={NewTenant}>
                </PrivateRoute>

                <PrivateRoute path="/admin/tenants"
                    hasAccess={isAdmin}
                    redirectPath={LOGIN_PATH}
                    component={AdminTenantList}>
                </PrivateRoute>
            </Router>
            </AdminProviders>
        </ContentProviders>
    );
}


export default AuthenticatedApp;
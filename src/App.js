import React from 'react'
import { useAuth } from './context/Authentication';
import { Spinner } from './components/Spinner';
import { Notifications } from './components/Notifications';
import { AppProviders } from './context';

const AuthenticatedApp = React.lazy(() => import('./view/AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./view/UnauthenticatedApp'));

function Startup() {
    const user = useAuth();
    return (
        <React.Fragment>
            { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
        </React.Fragment>
    );
}

function App() {
    return (
        <React.Suspense fallback={<Spinner />}>
            <AppProviders>
                <Startup />
            </AppProviders>
        </React.Suspense>
    );
}

export default App;
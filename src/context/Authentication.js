import React from 'react';
import * as jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie';
import UnauthenticatedApp from '../view/UnauthenticatedApp';

const AuthContext = React.createContext();

export function AuthProvider(props) {
    const [cookies] = useCookies(['securityToken']);
    let jwtError, data;
    try {
        data = jwt.decode(cookies.securityToken);
    } catch (err) {
        jwtError = err;
    }

    if (data) {
        return <AuthContext.Provider value={{ data }} {...props} />;
    } else if (jwtError || !cookies.securityToken) {
        return (
            <UnauthenticatedApp />
        );
    }
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error(`useAuth must be used within an AuthProvider`);
    }
    return context;
}

export function useAuthToken() {
    const token = useAuth();
    return token.data;
}

export function useIsAdmin() {
    const user = useAuthToken();
    return user.Authorities.some(a => a === 'ROLE_ADMIN');
}

export function useUserId() {
    return useAuthToken().name;
}

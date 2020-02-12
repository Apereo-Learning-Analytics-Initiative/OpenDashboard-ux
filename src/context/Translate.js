import React from 'react';
import useFetch from 'fetch-suspense';
import { useTranslationUrl } from '../shared/path';

const TranslateContext = React.createContext();

function TranslationProvider(props) {
    const tenants = useFetch(useTranslationUrl(), { method: 'GET', credentials: 'include' });

    return <TranslateContext.Provider value={tenants} {...props} />;
}

function useTranslation(key, params) {
    const context = React.useContext(TranslateContext);
    if (context === undefined) {
        throw new Error(`useTranslation must be used within a TranslationProvider`);
    }
    return React.useMemo(() => context.hasOwnProperty(key) ? context[key] : key, [key, context]);
}

function Translation ({ id }) {
    return (
        <React.Fragment>{ useTranslation(id) }</React.Fragment>
    );
}

export { TranslationProvider, useTranslation, Translation };
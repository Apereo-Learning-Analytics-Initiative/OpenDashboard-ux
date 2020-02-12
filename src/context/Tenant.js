import React from 'react';

import { useSelectors } from '../shared/hooks/useSelectors';

export const actions = {
    SET_TENANTS: '[Tenant Context] Set Tenant List',
    SET_SELECTED_TENANT: '[Tenant Context] Set Selected Tenant'
};

export const initialState = {
    tenants: [],
    selected: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.SET_TENANTS: {
            const { payload } = action;
            return {
                ...state,
                tenants: payload
            };
        }
        case actions.SET_SELECTED_TENANT: {
            const { payload } = action;
            return  {
                ...state,
                selected: payload
            }
        }
        default: {
            return state;
        }
    }
};


export const TenantContext = React.createContext({
    state: initialState
});

export function TenantProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <TenantContext.Provider value={{ state, dispatch }} {...props} />;
}

export function useTenantContextSelectors(r) {
    return useSelectors(r, (state) => {
        return {
            getTenantList: () => {
                return state.tenants;
            },
            getSelectedTenant: () => {
                return state.selected;
            }
        };
    });
}

export function useTenantSelectors() {
    const ctx = React.useContext(TenantContext);
    return useTenantContextSelectors([ctx.state, ctx.dispatch]);
}

export function useTenantList() {
    return useTenantSelectors().getTenantList();
}

export function useSelectedTenant() {
    return useTenantSelectors().getSelectedTenant();
}

export function useSelectedTenantProviderData() {
    const tenant = useSelectedTenant();
    return tenant ? tenant.providerData : null;
}

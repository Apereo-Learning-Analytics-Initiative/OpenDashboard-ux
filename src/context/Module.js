import React from 'react';

import { useSelectors } from '../shared/hooks/useSelectors';

export const actions = {
    LOAD_MODULE_CONFIGURATION_SUCCESS: '[Module Context] Load Module Configuration Success'
};

export const initialState = {
    modules: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.LOAD_MODULE_CONFIGURATION_SUCCESS: {
            const { payload } = action;
            return {
                ...state,
                modules: payload.Modules,
                lines: payload.Lines
            };
        }
        default: {
            return state;
        }
    }
};


export const ModuleContext = React.createContext({
    state: initialState
});

export function ModuleProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <ModuleContext.Provider value={{ state, dispatch }} {...props} />;
}

export function useModuleContextSelectors(r) {
    return useSelectors(r, (state) => {
        return {
            getModuleConfiguration: () => {
                return state.lines;
            }
        };
    });
}

export function useModuleSelectors() {
    const moduleContext = React.useContext(ModuleContext);
    return useModuleContextSelectors([moduleContext.state, moduleContext.dispatch]);
}

export function useModuleConfig() {
    return useModuleSelectors().getModuleConfiguration();
}

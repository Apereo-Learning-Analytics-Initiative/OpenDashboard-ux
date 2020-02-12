import React from 'react';

import { useSelectors } from '../shared/hooks/useSelectors';

import { Views } from '../shared/constant';

export const actions = {
    SET_STUDENT_DISPLAY_MODE: '[Student Context] Set Student Display Mode'
};

export const initialState = {
    mode: Views.CHART
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.SET_STUDENT_DISPLAY_MODE: {
            const { payload } = action;
            return {
                ...state,
                mode: payload
            };
        }
        default: {
            return state;
        }
    }
};


export const StudentContext = React.createContext({
    state: initialState
});

export function StudentProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <StudentContext.Provider value={{ state, dispatch }} {...props} />;
}

export function useStudentContextSelectors(r) {
    return useSelectors(r, (state) => {
        return {
            getStudentDisplayMode: () => {
                return state.mode;
            }
        };
    });
}

export function useStudentSelectors() {
    const studentContext = React.useContext(StudentContext);
    return useStudentContextSelectors([studentContext.state, studentContext.dispatch]);
}

export function useStudentDisplayMode() {
    return useStudentSelectors().getStudentDisplayMode();
}

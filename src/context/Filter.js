import React from 'react';
import moment from 'moment';

import { useSelectors } from '../shared/hooks/useSelectors';
import { DATA_DATE_FORMAT } from '../shared/constant';

export const SortFields = Object.freeze({
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    RISK: 'risk',
    ACTIVITY: 'activity'
});

export const SortOrders = Object.freeze({
    ASC: 'asc',
    DESC: 'desc'
})

export const actions = Object.freeze({
    SET_SORT_ON: '[Filtering Context] Set Sort Property',
    SET_SORT_ORDER: '[Filtering Context] Set Sort Order',
    SET_START_DATE: '[Filtering Context] Set Start Date',
    SET_END_DATE: '[Filtering Context] Set End Date',
    SET_DATES: '[Filtering Context] Set Dates',
    EXCLUDE_EVENTS: '[Filtering Context] Exclude Events'
});

export const initialState = {
    sortOn: SortFields.LAST_NAME,
    sortOnOrder: SortOrders.ASC,
    startDate: moment(new Date()).subtract({ days: 30 }).format(DATA_DATE_FORMAT),
    endDate: moment(new Date()).format(DATA_DATE_FORMAT),
    excludeEvents: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.SET_SORT_ON:
            return {
                ...state,
                sortOn: action.payload
            };
        case actions.SET_SORT_ORDER:
            return {
                ...state,
                sortOnOrder: action.payload
            };
        case actions.SET_START_DATE:
            return {
                ...state,
                startDate: action.payload
            };
        case actions.SET_END_DATE:
            return {
                ...state,
                endDate: action.payload
            };
        case actions.SET_DATES:
            return {
                ...state,
                startDate: action.payload.start,
                endDate: action.payload.end
            };
        case actions.EXCLUDE_EVENTS:
            return {
                ...state,
                excludeEvents: action.payload
            }
        default: {
            return state;
        }
    }
};

function useChartFilterReducer() {
    return React.useReducer(reducer, initialState);
}

export const FilterContext = React.createContext({
    state: initialState
});

export function FilterProvider(props) {
    const [state, dispatch] = useChartFilterReducer();
    return <FilterContext.Provider value={{ state, dispatch }} {...props} />;
}

export function useFilterContextSelectors(r) {
    return useSelectors(r, (state) => {
        return {
            getSortOn: () => {
                return state.sortOn;
            },
            getSortOrder: () => {
                return state.sortOnOrder;
            },
            getStartDate: () => {
                return state.startDate;
            },
            getEndDate: () => {
                return state.endDate;
            },
            getEventsToExclude: () => {
                return state.excludeEvents;
            }
        };
    });
}

export function useFilterSelectors() {
    const ctx = React.useContext(FilterContext);
    return useFilterContextSelectors([ctx.state, ctx.dispatch]);
}

export function useSortOn() {
    return useFilterSelectors().getSortOn();
}

export function useSortOrder() {
    return useFilterSelectors().getSortOrder();
}

export function useStartDate() {
    return useFilterSelectors().getStartDate();
}
export function useEndDate() {
    return useFilterSelectors().getEndDate();
}

export function useEventsToExclude() {
    return useFilterSelectors().getEventsToExclude();
}

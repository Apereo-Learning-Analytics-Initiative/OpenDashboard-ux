import React from 'react';

import { useSelectors } from '../shared/hooks/useSelectors';
import { createGuid } from '../shared/util/guid';

export const actions = {
    ADD_NOTIFICATION: '[Notification Context] Add Notification',
    REMOVE_NOTIFICATION: '[Notification Context] Remove Notification'
};

export const initialState = {
    notifications: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_NOTIFICATION: {
            const { payload } = action;
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    payload
                ]
            };
        }
        case actions.REMOVE_NOTIFICATION: {
            const { payload } = action;
            return {
                ...state,
                notifications: [
                    ...state.notifications.filter(n => n.id !== payload)
                ]
            }
        }
        default: {
            return state;
        }
    }
};


export const NotificationContext = React.createContext({
    state: initialState
});

export function NotificationProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <NotificationContext.Provider value={{ state, dispatch }} {...props} />;
}

export function useNotificationContextSelectors(r) {
    return useSelectors(r, (state) => {
        return {
            getNotifications: () => {
                return state.notifications;
            }
        };
    });
}

export function useNotificationSelectors() {
    const moduleContext = React.useContext(NotificationContext);
    return useNotificationContextSelectors([moduleContext.state, moduleContext.dispatch]);
}

export function useNotifications() {
    return useNotificationSelectors().getNotifications();
}

export function getNotification(body, type, duration) {
    return {
        body: body ? body : 'Alert!',
        type: type ? type : 'info',
        duration: duration ? duration : 5000,
        id: createGuid()
    };
}

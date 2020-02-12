import React from 'react';

import { useNotifications, NotificationContext, actions as NotificationActions } from '../context/Notification';
import { UncontrolledAlert } from 'reactstrap';

export function Notification ({ config }) {
    const { type, body, duration, id } = config;
    const { dispatch } = React.useContext(NotificationContext);

    setTimeout(() => dispatch({ type: NotificationActions.REMOVE_NOTIFICATION, payload: id }), duration);

    return (
        <UncontrolledAlert color={type} className="my-2">
            {body}
        </UncontrolledAlert>
    );
}

export function Notifications () {
    const notifications = useNotifications();

    return (
        <div className="position-fixed notification-list p-4 fixed-top d-flex justify-content-center">
            <div className="w-25">
                {notifications.map((n) =>
                    <Notification key={n.id} config={n} />
                )}
            </div>
        </div>
    );
}
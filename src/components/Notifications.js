import React, {useState} from 'react';

import { useNotifications, NotificationContext, actions as NotificationActions } from '../context/Notification';
import { Alert, UncontrolledAlert } from 'reactstrap';

export function Notification ({ config }) {
    const { type, body, duration, id } = config;
    const { dispatch } = React.useContext(NotificationContext);

    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    // setTimeout(() => dispatch({ type: NotificationActions.REMOVE_NOTIFICATION, payload: id }), duration);

    return (
        <Alert color={type} isOpen={visible} toggle={onDismiss}> {body} </Alert>
    );
}

export function Notifications () {
    const notifications = useNotifications();
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    return (
        <div>
                {notifications.map((n) =>
                    <Notification key={n.id} config={n} />
                )}
        </div>
    );
}
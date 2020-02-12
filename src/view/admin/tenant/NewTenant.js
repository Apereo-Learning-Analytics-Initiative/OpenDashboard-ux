import React from 'react';
import { withRouter } from 'react-router-dom';
import TenantForm from './TenantForm';
import * as TenantService from '../../../service/Tenant';
import { actions as NotificationActions, NotificationContext, getNotification } from '../../../context/Notification';
import { useTenantSaveUrl } from '../../../shared/path';

const DASHBOARD = '/admin/tenants';

function NewTenant({ history }) {

    const [data] = React.useState({});
    const { dispatch } = React.useContext(NotificationContext);
    const tenantSaveUrl = useTenantSaveUrl();

    const onCancel = () => {
        history.push(DASHBOARD);
    }

    const create = (form) => {
        const tenant = form.formData;
        TenantService.create(tenantSaveUrl, tenant).then(() => {
            dispatch({ type: NotificationActions.ADD_NOTIFICATION, payload: getNotification('Tenant created', 'success') });
            history.push(DASHBOARD);
        });
    };

    return (
        <div className="mx-auto mt-2 w-50">
            <TenantForm data={data} onCancel={ onCancel } onSubmit={create} />
        </div>
    );
}

export default withRouter(NewTenant);
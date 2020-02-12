import React from 'react';
import { withRouter } from 'react-router-dom';
import TenantForm from './TenantForm';

export function EditTenant({ history, tenant, updateTenant }) {

    const [data, setData] = React.useState({});

    React.useEffect(() => {
        const { name, description, idpEndpoint } = tenant;
        setData({ name, description, idpEndpoint });
    }, [tenant]);

    const onCancel = () => {
        history.push(`/admin/tenant/${tenant.id}`);
    }

    const save = (form) => {
        updateTenant({
            ...tenant,
            ...form.formData
        });
    };

    return (
        <div className="w-50 mt-2">
            <TenantForm data={ data } onSubmit={ save } onCancel={ onCancel } />
        </div>
    );
}

export default withRouter(EditTenant);
import React from 'react';
import { withRouter } from 'react-router-dom';
import SchemaFormCard from '../../../components/form/SchemaFormCard';
import { useTenantSchema } from '../../../shared/path';

function TenantForm(props) {

    const schema = useTenantSchema();

    const uiSchema = {
        idpEndpoint: {
            'ui:widget': 'uri'
        }
    };

    return (
        <SchemaFormCard
            className="w-100"
            title="Add new tenant"
            schema={schema}
            uiSchema={ uiSchema }
            { ...props } />
    );
}

export default withRouter(TenantForm);
import React from 'react';
import { withRouter } from 'react-router-dom';
import SchemaFormCard from '../../../components/form/SchemaFormCard';
import { useEventAliasSchema } from '../../../shared/path';

function AliasForm({ data, title, onSubmit, ...props }) {

    const schema = useEventAliasSchema();
    
    const uiSchema = {
        display: {
            'ui:widget': 'radio'
        },
        tenantId: {
            'ui:widget': 'hidden'
        }
    };

    return (
        <SchemaFormCard
            data={ data }
            className="w-100"
            title={ `${title ? title : 'Add Alias'}` }
            schema={schema}
            uiSchema={uiSchema}
            onSubmit={ (form) => onSubmit(form.formData) }
            {...props} />
    );
}

export default withRouter(AliasForm);
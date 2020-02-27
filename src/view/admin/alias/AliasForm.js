/**
 * @author xchopin <bonjour@chopin.us>
 * @author scody
 */

import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { useEventAliasSchema } from '../../../shared/path';
import SchemaForm from "../../../components/form/SchemaForm";

function AliasForm({data, title, onSubmit, ...props }) {

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
        <SchemaForm
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
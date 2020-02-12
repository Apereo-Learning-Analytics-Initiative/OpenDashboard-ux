import React from 'react';

import { SchemaForm } from '../../../components/form/SchemaForm';
import { useConsumerSchema } from '../../../shared/path';

export function AddConsumer({ onSave }) {

    const schema = useConsumerSchema();
    const [formData] = React.useState({ name: '' });

    const uiSchema = {
        consumerName: {
            placeholder: 'Consumer Name'
        }
    };

    return (
        <SchemaForm
            schema={schema}
            uiSchema={uiSchema}
            data={formData}
            onSubmit={(form) => onSave(form.formData)} />
    );
}

export default AddConsumer;
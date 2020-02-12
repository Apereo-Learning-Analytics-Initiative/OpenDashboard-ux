import React from 'react';
import Form from 'react-jsonschema-form';

import { Button } from 'reactstrap';

import { useTranslation } from '../../context/Translate';
import { useCustomFields, useCustomContext, useCustomFormats, useCustomWidgets, useCustomErrorMessages } from './hooks';
import { CustomFieldTemplate } from './CustomFieldTemplate';


export function SchemaForm({ schema, uiSchema, data, onDataChange, onCancel, onSubmit, ...props }) {

    const onChange = (changes) => {
        return onDataChange && onDataChange(changes.formData);
    };

    const fields = useCustomFields();
    const context = useCustomContext();
    const formats = useCustomFormats();
    const widgets = useCustomWidgets();
    const transformErrors = useCustomErrorMessages();

    const cancelText = useTranslation('BUTTON_CANCEL');
    const saveText = useTranslation('BUTTON_SAVE');

    return (
        <Form schema={schema}
            uiSchema={uiSchema}
            liveValidate={true}
            formContext={context}
            FieldTemplate={CustomFieldTemplate}
            fields={fields}
            widgets={widgets}
            customFormats={formats}
            transformErrors={transformErrors}
            noHtml5Validate={true}
            showErrorList={false}
            formData={data}
            onChange={onChange}
            onSubmit={onSubmit}>
            <div className="d-flex">
                <Button color="primary" type="submit">{saveText}</Button>
                {onCancel ? <Button color="link" type="button" onClick={onCancel}>{cancelText}</Button> : ''}
            </div>
        </Form>
    );
}

export default SchemaForm;
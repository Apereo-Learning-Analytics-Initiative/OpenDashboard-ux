import React from 'react';
import { withRouter, useParams } from 'react-router-dom';

import SchemaFormCard from '../../../components/form/SchemaFormCard';
import { useTranslation } from '../../../context/Translate';
import { useSelectedTenant } from '../../../context/Tenant';

import { useSchemaFromConfiguration } from '../../../service/Schema';
import { Alert } from 'reactstrap';

function parseProviderData(config, provider) {
    const parsed = {
        id: null,
        providerType: provider.providerType,
        providerKey: provider.providerKey,
        options: config.options.map(opt => ({
            key: opt.key,
            value: provider[opt.key],
            required: opt.required,
            encrypt: opt.encrypt
        }))
    };
    return parsed;
}

function formatProviderData(provider) {
    const formatted = provider ? {
        providerKey: provider.providerKey,
        providerType: provider.providerType,
        ...provider.options.reduce((coll, opt) => ({ ...coll, [opt.key]: opt.value }), {})
    } : {};

    return formatted;
}

function ProviderEditor({ history, definition, onSave, current }) {

    const tenant = useSelectedTenant();
    const params = useParams();

    const [data, setData] = React.useState({});

    const schemas = useSchemaFromConfiguration(definition.providerConfiguration);

    const cancel = () => {
        history.push(`/admin/tenant/${params.tenantId}/provider/${params.providerType}`);
    };

    const save = (form) => {
        const provider = parseProviderData(definition.providerConfiguration, form.formData);
        onSave(provider);
    };

    React.useEffect(() => {
        const current = tenant.providerData.find(p => p.providerKey === params.providerKey);
        setData({
            ...formatProviderData(current),
            providerKey: params.providerKey,
            providerType: params.providerType
        });
    }, [tenant.providerData, params.providerKey, params.providerType]);

    const editingIsCurrent = current && current.key === params.providerKey;
    const currentName = useTranslation(current && current.name);

    return (
        <div className="mt-2 w-50">
            {!editingIsCurrent ?
                <Alert color="danger">
                    <h4>Warning!</h4>
                    <p>You may only configure one provider per "type" (Course, Event, Roster, etc).
                        Configuring this provider will remove the configuration for: <strong>{currentName}</strong></p>
                </Alert>
            : '' }
            <SchemaFormCard
                title={useTranslation(definition.name)}
                schema={schemas.json}
                uiSchema={ schemas.ui }
                data={data}
                onSubmit={ save }
                onCancel={cancel} />
        </div>
    );
}

export default withRouter(ProviderEditor);
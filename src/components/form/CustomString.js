import React from 'react';
import * as types from 'react-jsonschema-form';

import {
    getWidget,
    getUiOptions,
    isSelect,
    optionsList,
    getDefaultRegistry,
    hasWidget,
} from 'react-jsonschema-form/lib/utils';

export function CustomString(props) {
    const {
        schema,
        name,
        uiSchema,
        idSchema,
        formData,
        required,
        disabled,
        readonly,
        autofocus,
        onChange,
        onBlur,
        onFocus,
        registry = getDefaultRegistry(),
        rawErrors,
    } = props;
    const { title, format } = schema;
    const { widgets, formContext } = registry;
    const enumOptions = isSelect(schema) && optionsList(schema);
    let defaultWidget = enumOptions ? 'select' : 'text';
    if (format && hasWidget(schema, format, widgets)) {
        defaultWidget = format;
    }
    const { widget = defaultWidget, placeholder = '', ...options } = getUiOptions(
        uiSchema
    );
    const Widget = getWidget(schema, widget, widgets);

    const customOnFocus = (form) => {
        formContext.setTouched(idSchema && idSchema.$id);
        onFocus(form);
    };

    const customOnChange = (form) => {
        formContext.setDirty(idSchema && idSchema.$id);
        onChange(form);
    }

    return (
        <Widget
            options={{ ...options, enumOptions }}
            schema={schema}
            id={idSchema && idSchema.$id}
            label={title === undefined ? name : title}
            value={formData}
            onChange={customOnChange}
            onBlur={onBlur}
            onFocus={customOnFocus}
            required={required}
            disabled={disabled}
            readonly={readonly}
            formContext={formContext}
            autofocus={autofocus}
            registry={registry}
            placeholder={placeholder}
            rawErrors={rawErrors}
        />
    );
}

if (process.env.NODE_ENV !== "production") {
    CustomString.propTypes = types.fieldProps;
}

CustomString.defaultProps = {
    uiSchema: {},
    disabled: false,
    readonly: false,
    autofocus: false,
};

export default CustomString;
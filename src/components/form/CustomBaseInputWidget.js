import React from "react";
import PropTypes from "prop-types";

export function CustomBaseInputWidget(props) {
    // Note: since React 15.2.0 we can't forward unknown element attributes, so we
    // exclude the "options" and "schema" ones here.
    if (!props.id) {
        console.log("No id for", props);
        throw new Error(`no id for props ${JSON.stringify(props)}`);
    }
    const {
        value,
        readonly,
        disabled,
        autofocus,
        onBlur,
        onFocus,
        options,
        schema,
        formContext,
        registry,
        rawErrors,
        ...inputProps
    } = props;

    // If options.inputType is set use that as the input type
    if (options.inputType) {
        inputProps.type = options.inputType;
    } else if (!inputProps.type) {
        // If the schema is of type number or integer, set the input type to number
        if (schema.type === "number") {
            inputProps.type = "number";
            // Setting step to 'any' fixes a bug in Safari where decimals are not
            // allowed in number inputs
            inputProps.step = "any";
        } else if (schema.type === "integer") {
            inputProps.type = "number";
            // Since this is integer, you always want to step up or down in multiples
            // of 1
            inputProps.step = "1";
        } else {
            inputProps.type = "text";
        }
    }

    // If multipleOf is defined, use this as the step value. This mainly improves
    // the experience for keyboard users (who can use the up/down KB arrows).
    if (schema.multipleOf) {
        inputProps.step = schema.multipleOf;
    }

    if (typeof schema.minimum !== "undefined") {
        inputProps.min = schema.minimum;
    }

    if (typeof schema.maximum !== "undefined") {
        inputProps.max = schema.maximum;
    }

    const _onChange = ({ target: { value } }) => {
        return props.onChange(value === "" ? options.emptyValue : value);
    };

    const {id} = inputProps;
    const { isPristine, lastUpdated } = formContext;
    const canShowErrors = !isPristine(id) && (id === lastUpdated);

    const validation = rawErrors && canShowErrors ? 'is-invalid' : '';

    return [
        <input
            key={id}
            className={ `form-control ${validation}` }
            readOnly={readonly}
            disabled={disabled}
            autoFocus={autofocus}
            value={value == null ? "" : value}
            {...inputProps}
            list={schema.examples ? `examples_${id}` : null}
            onChange={_onChange}
            onBlur={onBlur && (event => onBlur(id, event.target.value))}
            onFocus={onFocus && (event => onFocus(id, event.target.value))}
        />,
        schema.examples ? (
            <datalist id={`examples_${id}`}>
                {[
                    ...new Set(
                        schema.examples.concat(schema.default ? [schema.default] : [])
                    ),
                ].map(example => (
                    <option key={example} value={example} />
                ))}
            </datalist>
        ) : null,
    ];
}

CustomBaseInputWidget.defaultProps = {
    required: false,
    disabled: false,
    readonly: false,
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    CustomBaseInputWidget.propTypes = {
        id: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        value: PropTypes.any,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        autofocus: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
    };
}

export default CustomBaseInputWidget;
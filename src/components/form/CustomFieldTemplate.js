import React from 'react';

export function CustomFieldTemplate(props) {
    const { id, classNames, label, help, required, errors, children, hidden, formContext } = props;

    const { isPristine, lastUpdated } = formContext;
    const canShowErrors = !isPristine(id) && (id === lastUpdated);

    return (
        <div className={`${classNames} ${hidden ? 'd-none' : ''}`}>
            { label ? (<span className={ `control-label-wrapper ` }>
                <label htmlFor={id}>
                    {label}{required ? "*" : null}
                </label>
            </span>) : '' }
            {children}
            {canShowErrors ? errors : ''}
            {help}
        </div>
    );
}

export default CustomFieldTemplate;
import React from 'react';
import { CustomString } from './CustomString';
import { CustomBaseInputWidget } from './CustomBaseInputWidget';
import { ADMIN_FIELD_URL_REGEXP } from '../../service/Schema';
import { Translation } from '../../context/Translate';

export function useCustomFields () {
    return {
        StringField: CustomString
    };
}

export function useCustomWidgets () {
    return {
        BaseInput: CustomBaseInputWidget
    }
}

export function useCustomFormats() {
    return {
        url: ADMIN_FIELD_URL_REGEXP
    };
}

export function useCustomErrorMessages() {
    return (errors) => errors.map(error => {
        switch(error.name) {
            case 'format':
                return {
                    ...error,
                    message: <Translation id={'ERROR_URL_FORMAT'} />
                };
            case 'maxLength':
                return {
                    ...error,
                    message: <Translation id={`ERROR_MAX_LENGTH_LABEL_${error.property.replace('.', '').toUpperCase()}`} />
                };
            case 'required':
                return {
                    ...error,
                    message: <Translation id={`ERROR_REQUIRED_LABEL_${error.property.replace('.', '').toUpperCase()}`} />
                };
            default:
                return error;
        }
    });
}

export function useCustomContext() {
    const context = {
        lastUpdated: null,
        formControlState: {},
        invalid: false,
        setTouched: (id) => {
            context.formControlState[id] = 'touched';
            // context.lastUpdated = id;
        },

        setInvalid: (formIsInvalid) => {
            context.invalid = formIsInvalid;
        },

        setDirty: (id) => {
            context.formControlState[id] = 'dirty';
            context.lastUpdated = id;
        },

        isTouched: (id) => {
            return context.formControlState[id] === 'touched';
        },

        isPristine: (id) => {
            return context.formControlState[id] == null;
        },

        isDirty: (id) => {
            return context.formControlState[id] === 'dirty';
        },

        isInvalid: () => {
            return context.invalid;
        }
    };

    return context;
}
import React from 'react';
import { Alert } from 'reactstrap';

export function ErrorMessage({ heading, error }) {
    return (
        <Alert color="danger">
            <h4>{heading ? heading : `Error retrieving data.` }</h4>
            { error }
        </Alert>
    );
}
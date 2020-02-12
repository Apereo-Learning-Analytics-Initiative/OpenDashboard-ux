import React from 'react';
import { withRouter } from 'react-router-dom';
import AliasForm from './AliasForm';

function EditAlias({ data, redirectPath, history, ...props }) {

    const cancel = () => {
        history.push(redirectPath);
    };

    return (
        <AliasForm data={data} title={`Edit alias for ${data.verb}`} onCancel={ cancel } { ...props } />
    );
}

export default withRouter(EditAlias);
import React from 'react';
import { withRouter } from 'react-router-dom';
import AliasForm from './AliasForm';

function AddAlias({ tenantId, onSubmit }) {

    const data = {
        tenantId
    };

    return (
        <AliasForm data={data} onSubmit={ onSubmit } />
    );
}

export default withRouter(AddAlias);
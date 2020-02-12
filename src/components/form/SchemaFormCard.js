import React from 'react';

import { Card, CardBody, CardHeader } from 'reactstrap';

import { SchemaForm } from './SchemaForm';


export function SchemaFormCard({ title, className, ...props }) {
    return (
        <Card className={ className }>
            {title ? <CardHeader>{title}</CardHeader> : ''}
            <CardBody>
                <SchemaForm {...props} />
            </CardBody>
        </Card>
    );
}

export default SchemaFormCard;
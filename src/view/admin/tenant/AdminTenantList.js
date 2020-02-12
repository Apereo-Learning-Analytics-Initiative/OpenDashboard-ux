import React from 'react';
import { Link } from 'react-router-dom';

import { useTenantList } from '../../../service/Tenant';

function AdminTenantList() {

    const tenantlist = useTenantList();

    return (
        <div className="d-flex justify-content-center mt-2">
            <div className="w-33">
                <div className="list-group">
                    {tenantlist.map(tenant =>
                        <Link key={tenant.id} to={`/admin/tenant/${tenant.id}`} className="list-group-item list-group-item-action">
                            {tenant.name}
                        </Link>
                    )}
                </div>
                <hr />
                <div className="text-center">
                    <Link to={`/admin/tenants/new`} className="">Add a new tenant</Link>
                </div>
            </div>
        </div>
        
    );
}

export default AdminTenantList;
import React from 'react';
import { Link } from 'react-router-dom';

import { useTenantList } from '../../../service/Tenant';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function AdminTenantList() {

    const tenantList = useTenantList();

    return (
        <div className="container">
            <div className="mt-4">
                    <div className='mb-4'>
                        <span className='header-title'>My tenants</span>
                            <Link to={`/admin/tenants/new`} >
                                <button className='float-right btn btn-outline-primary'>
                                    <FontAwesomeIcon icon={faPlus} /> &nbsp;
                                    Add a new tenant
                                </button>
                            </Link>
                    </div>
                    <hr/>
                    { tenantList.length < 1  ?
                        <h5>There is no tenants yet, please create a new one.</h5>
                        :
                       <div className="list-group">
                          {tenantList.map(tenant =>
                              <Link key={tenant.id} to={`/admin/tenant/${tenant.id}`} className="list-group-item list-group-item-action">
                                  {tenant.name}
                              </Link>
                          )}

                       </div>
                    }

                </div>
        </div>
        
    );
}

export default AdminTenantList;
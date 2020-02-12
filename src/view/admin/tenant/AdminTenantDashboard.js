import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { TenantContext, actions as TenantActions, useSelectedTenant } from '../../../context/Tenant';
import { ProviderTypes } from '../provider/ProviderTypes';
import { Link, useParams, Route } from 'react-router-dom';
import { Translation } from '../../../context/Translate';
import { ProviderConfiguration } from '../provider/ProviderConfiguration';
import { Consumers } from '../consumer/Consumers';
import * as TenantService from '../../../service/Tenant';
import {EditTenant} from './EditTenant';

import { NotificationContext, actions as NotificationActions, getNotification } from '../../../context/Notification';
import { useTenantSaveUrl, useTenantUrl } from '../../../shared/path';
import EventAliasManager from '../alias/EventAliasManager';
import InfoPopup from '../../../components/InfoPopup';

function AdminTenantDashboard({ match }) {

    const { dispatch } = React.useContext(TenantContext);

    const notify = React.useContext(NotificationContext);

    const params = useParams();
    const tenantId = params.tenantId;

    const tenantSaveUrl = useTenantSaveUrl(tenantId);
    const tenantGetUrl = useTenantUrl(tenantId);

    const tenant = useSelectedTenant();

    React.useEffect(() => {
        dispatch({ type: TenantActions.SET_SELECTED_TENANT, payload: tenant });
    }, [tenant, dispatch]);

    const loadTenant = (id, url) => {
        return TenantService.find(url, id).then((payload) => dispatch({ type: TenantActions.SET_SELECTED_TENANT, payload }))
    };

    const updateTenant = (updates) => {       
        TenantService.save(tenantSaveUrl, updates).then(payload => {
            notify.dispatch({ type: NotificationActions.ADD_NOTIFICATION, payload: getNotification('Tenant Updated', 'success') });
            loadTenant(tenantId, tenantGetUrl);
        });
    };

    React.useEffect(() => {
        loadTenant(tenantId, tenantGetUrl);
    }, [tenantId, tenantGetUrl]);

    return (
        <React.Fragment>
            {tenant &&
                <div className="container-fluid p-4">

                    <div className="row">
                        <div className="col-12">
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    {tenant.name}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <Link to={`/admin/tenant/${tenant.id}/edit`} className="dropdown-item">
                                        Edit
                                    </Link>
                                    <Link to="/admin/tenants" className="dropdown-item">
                                        All Tenants
                                    </Link>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-3">
                            <div className="list-group">
                                <Link className="list-group-item d-flex justify-content-between" to={`/admin/tenant/${tenantId}/eventalias`}>
                                    Event Aliases
                                    <InfoPopup
                                        header={`Configure Events`}
                                        body={`Add event aliases for events to customize how they will be displayed to a user. You can also configure if they display at all`}></InfoPopup>
                                </Link>
                            </div>
                            <div className="card  my-2">
                                <div className="card-header d-flex justify-content-between">
                                    Providers
                                    <InfoPopup
                                        header={`Configure Providers`}
                                        body={`Before using the Dashboard, the data providers must be configured.`}></InfoPopup>
                                </div>
                                <div className="list-group list-group-flush">
                                    {ProviderTypes.map(provider => (
                                        <Link key={provider.type} className="list-group-item" to={`/admin/tenant/${tenantId}/provider/${provider.type}`}>
                                            <Translation id={provider.key} />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Consumers tenant={tenant} updateTenant={updateTenant} />
                        </div>
                        <div className="col-md-9">
                            <Route path={`${match.path}/edit`} render={
                                ({ match }) => <EditTenant tenant={tenant} updateTenant={updateTenant} />
                            } />
                            <Route path={`${match.path}/provider/:providerType`} render={
                                ({ match }) => <ProviderConfiguration match={match} updateTenant={updateTenant} />
                            } />
                            <Route path={`${match.path}/eventalias`} render={
                                ({ match }) => <EventAliasManager />
                            } />
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
        
    );
}

export default AdminTenantDashboard;
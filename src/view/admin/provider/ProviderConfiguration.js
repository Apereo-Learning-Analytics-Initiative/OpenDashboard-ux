import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useParams, Route, withRouter, Link } from 'react-router-dom';
import { faCog, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import findIndex from 'lodash/findIndex';

import { Translation, useTranslation } from '../../../context/Translate';
import ProviderEditor from './ProviderEditor';
import { useSelectedTenant, useSelectedTenantProviderData } from '../../../context/Tenant';
import { useProviderConfiguration } from '../../../service/Provider';

export function ProviderConfiguration({ match, updateTenant }) {

    const [deleting, setDeleting] = React.useState();
    const [modal, setModal] = React.useState(false);

    const toggleModal = () => setModal(!modal);

    const providers = useSelectedTenantProviderData();
    const tenant = useSelectedTenant();
    const params = useParams();
    const type = params.providerType;
    const configuration = useProviderConfiguration(type);

    const configs = configuration.map((config) => ({
        ...config,
        isConfigured: providers?providers.find(p => p.providerKey === config.key):false
    }));

    React.useEffect(() => {
        setModal(deleting ? true : false);
    }, [deleting]);

    const deleteProvider = (provider) => {
        const updates = { ...tenant };
        updates.providerData = updates.providerData.filter(p => p.providerKey !== provider.key);
        updateTenant(updates);
        setDeleting(null);
    };

    const updateProviders = (provider) => {
        const updates = { ...tenant };

        if (!updates.providerData) { updates.providerData = []; }
        const indexOfProvider = findIndex(updates.providerData, (p) => p.providerType === provider.providerType);  
              
        if (indexOfProvider==-1) {
            updates.providerData.push(provider);
        } else {
           updates.providerData[indexOfProvider] = provider;
        }
        updateTenant(updates);
    };

    return (
        <React.Fragment>
            <div className="table-responsive">
                <h3>{type}</h3>
                <table className="table table-hover table-striped table-responsive w-100">
                    <thead>
                        <tr>
                            <th className="">NAME</th>
                            <th className="">DESCRIPTION</th>
                            <th className="">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {configs.map(provider => (
                            <tr key={provider.key}>
                                <td><Translation id={provider.name} /></td>
                                <td><Translation id={provider.desc} /></td>
                                <td>{!provider.isConfigured ? (
                                    <Link className="btn btn-link"
                                        id="BUTTON_PROVIDERLIST_ADMIN_CONFIGURE"
                                        to={`${match.url}/${provider.key}/edit`}>
                                        <FontAwesomeIcon icon={faCog} />
                                    </Link>
                                ) : (
                                        <React.Fragment>
                                            <Link className="btn btn-link"
                                                id="BUTTON_PROVIDERLIST_ADMIN_EDIT_CONFIGURE"
                                                to={`${match.url}/${provider.key}/edit`}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>
                                            <button className="btn btn-link"
                                                id="BUTTON_PROVIDERLIST_ADMIN_DELETE_CONFIGURE"
                                                onClick={ () => setDeleting(provider) }>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </React.Fragment>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={!!modal} toggle={toggleModal}>
                <ModalHeader>
                    {useTranslation(`${deleting ? deleting.name : ''}`)}
                </ModalHeader>
                <ModalBody>
                    <h1>{useTranslation('TEXT_CONFIRM_DELETEPROVIDER')}</h1>
                    <p className="lead">{useTranslation('TEXT_CONFIRM_DELETEPROVIDER_BODY')}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger"
                        id="BUTTON_CONFIGUREPROVIDER_ADMIN_DELETE"
                        onClick={() => deleteProvider(deleting)}>{useTranslation('BUTTON_DELETE') }</Button>{' '}
                    <Button color="link"
                        id="BUTTON_CONFIGUREPROVIDER_ADMIN_CANCEL"
                        onClick={toggleModal}>{useTranslation('BUTTON_CANCEL')}</Button>
                </ModalFooter>
            </Modal>
            <Route path={`${match.path}/:providerKey/edit`} render={
                ({ match }) => <ProviderEditor
                    definition={configs.find(c => c.key === match.params.providerKey)}
                    current={ configs.find(c => c.isConfigured) }
                    onSave={ (provider) => updateProviders(provider) } />
            } />
        </React.Fragment>
    );
}

export default withRouter(ProviderConfiguration);
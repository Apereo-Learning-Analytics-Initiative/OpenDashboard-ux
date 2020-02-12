import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { AddConsumer } from './AddConsumer';
import { createGuid } from '../../../shared/util/guid';
import { useTranslation } from '../../../context/Translate';
import InfoPopup from '../../../components/InfoPopup';

export function Consumers ({ updateTenant, tenant }) {
    const [deleting, setDeleting] = React.useState();
    const [modal, setModal] = React.useState(false);

    React.useEffect(() => {
        setModal(deleting ? true : false);
    }, [deleting]);

    const toggleModal = () => setModal(!modal);

    const onSaveNewConsumer = (consumer) => {       
        const updates = {
            ...tenant,
            consumers: [
                ...tenant.consumers,
                {
                    ...consumer,
                    id: createGuid(),
                    oauthConsumerKey: createGuid(),
                    oauthConsumerSecret: createGuid()
                }
            ]
        };
        updateTenant(updates);
    };

    const onDeleteConsumer = (consumer) => {
        const updates = {
            ...tenant,
            consumers: tenant.consumers.filter(c => c.id !== consumer.id)
        };
        setDeleting(null);
        updateTenant(updates);
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader>Consumers                                     <InfoPopup
                                        header={`Configure Consumers`}
                                        body={`Generate key/secret combinations so that an LMS can access your system via an LTI Launch. Simply enter a name in the 'Add new consumer' textbox and select save.`}></InfoPopup>
                                </CardHeader>
                <ListGroup flush>
                    {tenant.consumers.map((consumer, index) =>
                        <ListGroupItem key={index}>
                            <div className="d-flex justify-content-between">
                                <h5>{consumer.name}</h5>
                                <Button color="link" size="sm" onClick={() => setDeleting(consumer)}>
                                    <FontAwesomeIcon icon={faTrash} className="text-danger" />
                                </Button>
                            </div>
                            <p className="m-0">Key: {consumer.oauthConsumerKey}</p>
                            <p className="m-0">Secret: {consumer.oauthConsumerSecret}</p>
                        </ListGroupItem>
                    )}
                </ListGroup>
                <CardBody>
                    <AddConsumer onSave={onSaveNewConsumer} />
                </CardBody>
            </Card>
            <Modal isOpen={!!modal} toggle={toggleModal}>
                <ModalHeader>
                    { deleting ? deleting.name : '' }
                </ModalHeader>
                <ModalBody>
                    <h1>{useTranslation('TEXT_CONFIRM_DELETECONSUMER')}</h1>
                    <p className="lead">{useTranslation('TEXT_CONFIRM_DELETECONSUMER_BODY')}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger"
                        id="BUTTON_CONFIGURECONSUMER_ADMIN_DELETE"
                        onClick={() => onDeleteConsumer(deleting)}>{useTranslation('BUTTON_DELETE')}</Button>{' '}
                    <Button color="link"
                        id="BUTTON_CONFIGURECONSUMER_ADMIN_CANCEL"
                        onClick={toggleModal}>{useTranslation('BUTTON_CANCEL')}</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
        
    )
}
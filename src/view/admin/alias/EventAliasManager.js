/**
 * @author xchopin <bonjour@chopin.us>
 * @author scody
 */

import React, {useState} from 'react';
import { Route, Link, withRouter, useParams } from 'react-router-dom';
import findIndex from 'lodash/findIndex';
import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import EditAlias from './EditAlias';
import {create, update, remove, useFindAll} from '../../../service/Alias';
import { useTenantAliasUrl, useTenantAliasDeleteUrlFn } from '../../../shared/path';
import AliasForm from './AliasForm';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faCross, faPen, faPlus, faTimes, faTrash, faWindowClose} from "@fortawesome/free-solid-svg-icons";


function EventAliasManager({ match }) {

    const params = useParams();
    const tenantId = params.tenantId;
    const url = useTenantAliasUrl(tenantId);
    const deleteUrl = useTenantAliasDeleteUrlFn();
    const defaultAlias = { tenantId };
    const redirectPath = `${match.url}`;
    const [list, setList] = React.useState(useFindAll(tenantId));
    const [newAlias, setNewAlias] = React.useState({ ...defaultAlias });
    const [modal, setModal] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalBody, setModalBody] = useState(false);
    const toggle = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    /**
     * Show a modal window with the form
     * @param title
     * @param body
     */
    const showModal = (title, body) => {
        toggle();
        setModalTitle(title);
        setModalBody(body);
    };


    React.useEffect(() => {
        setList(list);
    }, [list]);

    /**
     * Persist the new alias into the API
     * @param data
     */
    const saveAlias = (data) => {
        create(url, data).then((resp) => {
            const newList = [ ...list ];
            newList.push(resp);
            setList(newList);
            setNewAlias({ ...defaultAlias });
        });

        setModal(false);
    };

    /**
     * Update the alias into the API
     * @param data
     */
    const updateAlias = (data) => {
        update(url, data).then((resp) => {
            const newList = [ ...list ];
            const indexToUpdate = findIndex(newList, (a) => a.id === data.id);
            const old = newList[indexToUpdate];
            newList[indexToUpdate] = { ...old, ...data };
            setList(newList);
        })

        setModal(false);
    };



    /**
     * Display the modal window with the 'add new alias' form
     */
    const showNewForm = () => {
        const data = { tenantId };
        const body =  <AliasForm data={data} onSubmit={ saveAlias } />;
        showModal('Add an alias', body)
    };


    const showEditForm = (itemId, itemName) => {
        const body = <EditAlias onSubmit={ updateAlias }  data={ list.find(a => a.id === itemId) } />
        showModal('Edit "' + itemName + '" event alias' , body);
    };



    const deleteAlias = (data) => {
        remove(deleteUrl(data.id), data).then(resp => {
            setList(list.filter(a => a.id !== data.id));
        });
    };



    return (
        <React.Fragment>
            <button className="btn btn-outline-primary btn-block" onClick={showNewForm } >
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> &nbsp;
                Add an event alias
            </button>
            <br/>

            { list.length < 1  ? <h6>There is no event alias available.</h6> :
                <div className="list-aliases">
                    <hr/>
                    <br/>
                    <span className="section-title">Existing Aliases</span>


                    <br/>
                    <br/>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Verb</th>
                                <th>Alias</th>
                                <th>Display</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) =>
                            <tr key={index}>
                                <td id={item.verb} className="text-break">{item.verb}</td>
                                <td className="text-break">{item.alias}</td>
                                <td>{
                                    item.display ?
                                        <FontAwesomeIcon color='green' icon={faCheck}></FontAwesomeIcon>
                                        :
                                        <FontAwesomeIcon color='red' icon={faTimes}></FontAwesomeIcon> }</td>
                                <td>
                                    <button className="btn btn-lg btn-primary btn-sm" onClick={ () => showEditForm(item.id, item.verb)}>
                                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> &nbsp;
                                        Edit
                                    </button> &nbsp;
                                    <button className="btn btn-lg btn-danger btn-sm" onClick={ () => deleteAlias(item) }>
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> &nbsp;
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>
                    { modalTitle }
                </ModalHeader>
                <ModalBody>
                    { modalBody }
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

//            <Route path={`${match.path}`} exact render={
//                 ({ match }) => <AddAlias data={ newAlias } onSubmit={ addNewAlias } />
//             } />
//             <Route path={`${match.path}/:alias`} render={
//                 ({ match }) => <EditAlias onSubmit={ updateAlias } redirectPath={redirectPath} data={ aliases.find(a => a.id === match.params.alias) } />
//             } />

export default withRouter(EventAliasManager);
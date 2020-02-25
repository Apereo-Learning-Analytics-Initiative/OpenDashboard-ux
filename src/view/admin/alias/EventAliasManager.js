import React from 'react';
import { Route, Link, withRouter, useParams } from 'react-router-dom';
import findIndex from 'lodash/findIndex';
import { useTenantAliasList } from '../../../service/Tenant';
import { Button } from 'reactstrap';
import EditAlias from './EditAlias';
import AddAlias from './AddAlias';
import { create, update, remove } from '../../../service/Alias';
import { useTenantAliasUrl, useTenantAliasDeleteUrlFn } from '../../../shared/path';


function EventAliasManager({ match }) {

    const params = useParams();
    const tenantId = params.tenantId;
    const url = useTenantAliasUrl(tenantId);
    const deleteUrl = useTenantAliasDeleteUrlFn();
    
    const defaultAlias = { tenantId };

    const aliases = useTenantAliasList(tenantId);
    const redirectPath = `${match.url}`;

    const [list, setList] = React.useState([]);
    const [newAlias, setNewAlias] = React.useState({ ...defaultAlias });

    React.useEffect(() => {
        setList(aliases);
    }, [aliases]);

    const addNewAlias = (data) => {
        create(url, data).then((resp) => {
            const list = [ ...aliases ];
            list.push(resp);
            setList(list);
            setNewAlias({ ...defaultAlias });
            location.reload();
        });
    };

    const updateAlias = (data) => {
        update(url, data).then(resp => {
            const list = [ ...aliases ];
            const indexToUpdate = findIndex(list, (a) => a.id === data.id);
            const old = list[indexToUpdate];
            list[indexToUpdate] = { ...old, ...data };
            setList(list);
            location.reload();
        })
    };

    const deleteAlias = (data) => {
        remove(deleteUrl(data.id), data).then(resp => {
            setList(aliases.filter(a => a.id !== data.id));
        });
    };

    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Verb</th>
                        <th>Alias</th>
                        <th>Display</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((a, index) =>
                    <tr key={index}>
                        <td className="text-break">{a.verb}</td>
                        <td className="text-break">{a.alias}</td>
                        <td>{a.display ? 'true' : 'false'}</td>
                        <td className="btn-group">
                            <Link className="btn btn-primary btn-sm" to={ `${match.url}/${a.id}` } >Edit</Link>
                            <Button color="danger" size="sm" onClick={ () => deleteAlias(a) }>Delete</Button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            <Route path={`${match.path}`} exact render={
                ({ match }) => <AddAlias data={ newAlias } onSubmit={ addNewAlias } />
            } />
            <Route path={`${match.path}/:alias`} render={
                ({ match }) => <EditAlias onSubmit={ updateAlias } redirectPath={redirectPath} data={ aliases.find(a => a.id === match.params.alias) } />
            } />
        </React.Fragment>
        
    );
}

export default withRouter(EventAliasManager);
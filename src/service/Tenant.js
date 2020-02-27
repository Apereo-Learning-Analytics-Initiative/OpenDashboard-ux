import useFetch from 'fetch-suspense';

import { useTenantUrl, useTenantsUrl, useTenantAliasUrl } from '../shared/path';

export function save (url, tenant) {
    return fetch(
        url,
        {
            method: 'PUT',
            body: JSON.stringify(tenant),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(resp => resp.json());
}

export function create (url, tenant) {
    return fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify(tenant),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(resp => resp.json());
}

export function find(url, tenantId) {
    return fetch(
        url,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(resp => resp.json());
}

export function useTenantList() {
    return useFetch(useTenantsUrl(), { credentials: 'include' });
}


export default { save, create, find };
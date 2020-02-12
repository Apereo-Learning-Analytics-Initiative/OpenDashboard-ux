import { useLoginUrl } from '../shared/path';

export function authenticate (username, password, path) {
    const headers = {
        'Content-Type': 'application/json'
    };

    const credentials = `${ username }:${ password }`;

    if (username && password) {
        headers['Authorization'] = `Basic ${ btoa(credentials) }`;
    }
    //const api = useBaseUrl() + '${}/login';    
    return fetch(path,
        { 
            credentials: 'include', 
            mode: 'cors',
            headers
        });

                                        
        /* {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers,
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    });*/
    //return response.text();
}
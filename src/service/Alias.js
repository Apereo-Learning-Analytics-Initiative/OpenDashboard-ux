export function update(url, data) {
    return fetch(
        url,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(resp => resp.json());
}

export function create(url, data) {
    return fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(resp => resp.json());
}

export function remove(url, data) {
    return fetch(
        url,
        {
            method: 'DELETE',
            //body: JSON.stringify(data),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(resp => resp.json());
}
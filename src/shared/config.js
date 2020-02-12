import useFetch from 'fetch-suspense';

export function useAppConfig () {
    return useFetch('/config.json', { credentials: 'include' });
}
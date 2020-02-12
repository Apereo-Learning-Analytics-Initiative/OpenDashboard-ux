import useFetch from 'fetch-suspense';
import { useConfigurationUrl } from '../shared/path';

export function useProviderConfiguration(type) {
    return useFetch(useConfigurationUrl(type), { credentials: 'include' });
}
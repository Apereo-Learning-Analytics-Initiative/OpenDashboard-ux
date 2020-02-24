import useFetch from 'fetch-suspense';
import { useAppConfig } from './config';

export const DEV_MODE = false;

export const API_URLS = {
    tenants: () => DEV_MODE ? `/json/tenantlist.json` : `api/tenant`,
    tenant: (tenantId) => DEV_MODE ? `/json/tenant.json` : `api/tenant/${tenantId}`,
    tenantPut: () => DEV_MODE ? `/json/tenant.json` : `api/tenant`,
    translations: () => DEV_MODE ? `/json/framework.json` : `/json/framework.json`,
    modules: (studentId) => DEV_MODE ? `/json/modules.json` : `/json/modules.json`,
    course: (studentId) => DEV_MODE ? '/json/tenantlist.json' : `api/modules/${studentId}`,
    events: (classId, studentId) => DEV_MODE ? `/json/events.1.json` : `api/classes/${classId}/events/${studentId}`,
    pulse: (classId, userId) => DEV_MODE ? `/json/tenants.json` : `api/tenants`,
    providerConfig: (type) => DEV_MODE ? `/json/${type}.json` : `api/providers/${type}`,
    login: () => DEV_MODE ? `/json/ok.txt` : `login`, 
    tenantAliasGet: (tenantId) => DEV_MODE ? `/json/eventalias.json` : `api/eventAlias/tenantId/${tenantId}`,
    tenantAliasDelete: (eventAliasId) => DEV_MODE ? `/json/eventalias.json` : `api/eventAlias/${eventAliasId}`
};

export function useBaseUrl() {
    const config = useAppConfig();
    return DEV_MODE ? '' : config.API_BASE_URL;
}

export function useLoginUrl() {
    return `${useBaseUrl()}${API_URLS.login()}`;
}

export function useConsumerSchema() {
    return useFetch('/schema/consumer/consumer.json', { credentials: 'include' });
}

export function useTenantSchema() {
    return useFetch('/schema/tenant/tenant.json', { credentials: 'include' });
}

export function useEventAliasSchema () {
    return useFetch('/schema/aliases/events.json', { credentials: 'include' });
}

export function useStudentEventUrl (classId, studentId) {
    return `${useBaseUrl()}${API_URLS.events(classId, studentId )}`;
}

export function usePulseDataUrl(classId, userId) {
    return `${useBaseUrl()}${API_URLS.pulse(classId, userId)}`;
}

export function useTranslationUrl() {
    return `${API_URLS.translations()}`;
    //${useBaseUrl()}
}

export function useConfigurationUrl(type) {
    return `${useBaseUrl()}${API_URLS.providerConfig(type)}`;
}

export function useModuleUrl(studentId) {
    return `${API_URLS.modules(studentId)}`;
    //${useBaseUrl()}
}

export function useTenantUrl(id) {
    return `${useBaseUrl()}${API_URLS.tenant(id)}`;
}

export function useTenantsUrl() {
    return `${useBaseUrl()}${API_URLS.tenants()}`;
}

export function useTenantSaveUrl(id) {
    return `${useBaseUrl()}${API_URLS.tenantPut(id)}`
}

export function useTenantAliasUrl(tenantId) {
    console.log("tenantId:", tenantId);
    console.log("url:", API_URLS.tenantAliasGet(tenantId));
    return `${useBaseUrl()}${API_URLS.tenantAliasGet(tenantId)}`;
}

export function useTenantAliasDeleteUrlFn() {
    const base = useBaseUrl();
    return (eventAliasId) => `${base}${API_URLS.tenantAliasDelete(eventAliasId)}`;
}

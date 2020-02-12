import React from 'react'
import { AuthProvider } from './Authentication';
import { CourseProvider } from './Course';
import { TranslationProvider } from './Translate';
import { ModuleProvider } from './Module';
import { FilterProvider } from './Filter';
import { StudentProvider } from './Student';
import { TenantProvider } from './Tenant';
import { NotificationProvider } from './Notification';

export function AppProviders({ children }) {
    return (
        <AuthProvider>
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </AuthProvider>
    )
}

export function ContentProviders({children}) {
    return (
        <TranslationProvider>
        <CourseProvider>
        <ModuleProvider>
        <FilterProvider>
        <StudentProvider>
            {children}
        </StudentProvider>
        </FilterProvider>
        </ModuleProvider>
        </CourseProvider>
        </TranslationProvider>
    );
}

export function AdminProviders({ children }) {
    return (
        <TenantProvider>
            {children}
        </TenantProvider>
    );
}


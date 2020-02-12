import React from 'react';
import { useAppConfig } from '../../shared/config';

export function BrandHeader() {
    const config = useAppConfig();

    return (
        <header className="header fixed-top brand-header bg-white px-4 py-3 border-bottom border-secondary">
            <h1 className="h4 m-0">
                <a className="logo-link d-flex px-4 align-items-center" href={ config.logo.url ? config.logo.url : `/` } aria-label="Dashboard">
                    <img className="app-logo" src={config.logo.imagePath} alt="Logo" />
                    <span className="brand-name ml-3">Student Success Dashboard</span>
                </a>
            </h1>
        </header>
    );
}

export default BrandHeader;


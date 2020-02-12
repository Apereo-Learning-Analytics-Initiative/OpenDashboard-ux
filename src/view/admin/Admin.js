import React from 'react';

import BrandHeader from '../layout/BrandHeader';
import BrandFooter from '../layout/BrandFooter';

export function Admin({ children }) {
    return (
        <div className="admin d-flex flex-column justify-content-between h-100">
            <BrandHeader />
            <main className="flex-fill">
                { children }
            </main>
            <BrandFooter />
        </div>
    );
}

export default Admin;

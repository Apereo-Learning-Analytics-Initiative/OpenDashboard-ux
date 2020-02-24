import React from 'react';

export function BrandFooter() {
    return (
        <footer className="py-4 footer brand-footer d-flex justify-content-center align-items-center">
            <div className="footer-license">
                <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/2.0/uk/">
                    <img src="/images/cc_BY-NC-SA.png" alt="License" width="140" height="49" />
                </a>
            </div>
            <div className="footer-copyright ml-2">
                <span className="print-only">©2020 Apereo Foundation. &nbsp;</span>
                This work is licensed under the <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/2.0/uk/">CC BY-NC-SA 4.0</a>
            </div>
        </footer>
    );
}

export default BrandFooter;
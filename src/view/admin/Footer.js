import React from 'react';

export function Footer () {
    return (
        <footer className="py-4">
            <div className="footer-content">
                <div className="footer-license">
                    <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/2.0/uk/">
                        <img src="/images/cc_BY-NC-SA.png" alt="License" width="140" height="49" data-pin-nopin="true" />
                    </a>
                </div>
                <div className="footer-copyright">
                    <span className="print-only">©2016 Jisc.</span>
                    This work is licensed under the <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/2.0/uk/">CC BY-NC-SA 4.0</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
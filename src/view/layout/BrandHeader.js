import React, { useState } from 'react';
import {
    Navbar,
    Nav,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu, NavbarBrand, DropdownToggle
} from 'reactstrap';

import { useAppConfig } from '../../shared/config';
import {Link} from "react-router-dom";
import {Notifications} from "../../components/Notifications";

export function BrandHeader() {
    const config = useAppConfig();
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
            <header>
            <Navbar light color="white"  expand="md">
                <NavbarBrand className="brand" tag={Link} to={'/'} >
                    <img alt="logo" className="app-logo" src={config.logo.imagePath}></img>
                    <span className="brand-name">Student Success Dashboard</span>
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2"  />
                <Collapse isOpen={!collapsed} navbar >
                    <Nav className="mr-auto " navbar >
                        <NavItem right>
                            <NavLink href="">Item</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Example
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
            <Notifications />
        </div>
    );
}

/**
 *
 <header className="header fixed-top brand-header bg-white px-4 py-3 border-bottom border-secondary">
 <Button>test</Button>
 <h1 className="h4 m-0">
 <img className="app-logo" src={config.logo.imagePath} alt="Logo" />
 <span className="brand-name ml-3">Student Success Dashboard</span>
 </a>
 </h1>
 </header>
 */

export default BrandHeader;


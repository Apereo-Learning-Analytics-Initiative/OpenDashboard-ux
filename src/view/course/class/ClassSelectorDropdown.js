import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Truncated } from '../../../components/Truncated';



export function ClassSelectorDropdown({ showClasses, classList, children }) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="button" className="link-lg btn btn-secondary btn-lg" caret={ showClasses }>
                {children}
            </DropdownToggle>
            {showClasses ?
            <DropdownMenu>
                {classList.map(classItem =>
                    <DropdownItem
                        key={classItem.id}
                        tag={Link}
                        to={`/courselist/${classItem.id}`}>
                            <Truncated text={ classItem.label } />
                        </DropdownItem>
                )}
            </DropdownMenu>
            : ''}
        </Dropdown>
    );
}

export default ClassSelectorDropdown;
import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCaretDown, faCaretUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

export function EventFilter ({ events, excluded, onChange, ...props }) {

    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} { ...props }>
            <DropdownToggle tag="button" className="btn btn-secondary">
                <FontAwesomeIcon icon={faFilter} />
                &nbsp;
                Filter Events
                &nbsp;
                <FontAwesomeIcon icon={dropdownOpen ? faCaretUp : faCaretDown} />
            </DropdownToggle>
            <DropdownMenu right>
                {events.map(e =>
                    <button className={ `dropdown-item` }
                        key={e}
                        onClick={() => onChange(e)}
                        disabled={ excluded.indexOf(e) === -1 && excluded.length >= events.length - 1 }>
                            <FontAwesomeIcon icon={ excluded.indexOf(e) > -1 ? faSquare : faCheckSquare } />
                            &nbsp;
                            { e }
                    </button>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}

export default EventFilter;
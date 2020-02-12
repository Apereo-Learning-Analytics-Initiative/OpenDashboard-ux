import React, { useState } from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export function ConfigDropdown ({ label, toggleLabel, color, children }) {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <React.Fragment>
            <Button id="ConfigPopover" color={ color ? color : 'link' } type="button" fade="false">
                { toggleLabel ? toggleLabel : <FontAwesomeIcon icon={ faCog } /> }
            </Button>
            <Popover className="config-popover" placement="bottom" isOpen={popoverOpen} target="ConfigPopover" toggle={toggle}>
                {label ? <PopoverHeader>{ label }</PopoverHeader> : '' }
                <PopoverBody>
                    {children}
                </PopoverBody>
            </Popover>
        </React.Fragment>
    );
}
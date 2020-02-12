import React from 'react';

import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InfoPopup({ icon, children, header, body }) {

    //const id = "" + Math.floor(Math.random() * Math.floor(50)) + "_TEST";
    
    const id = header.replace(/\s/g, '_').replace(/\W/g, '');

    const infoIcon = icon ? icon : faInfoCircle;

    const [popoverOpen, setPopoverOpen] = React.useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const clickIcon = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
    };

    return (
        <React.Fragment>
            <button id={id} className="btn btn-text" type="button" onClick={ clickIcon }>
                <FontAwesomeIcon size="lg" icon={infoIcon} />
            </button>
            <Popover className="info-popover" trigger="focus" placement="top" isOpen={popoverOpen} target={id} toggle={toggle}>
                <PopoverHeader className="text-xl d-flex justify-content-between">
                    <strong>{header}</strong>
                    <button type="button" className="close" onClick={ toggle }>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </PopoverHeader>
                <PopoverBody className="text-xl">
                    {body}
                </PopoverBody>
            </Popover>
        </React.Fragment>
    );
}

export default InfoPopup;
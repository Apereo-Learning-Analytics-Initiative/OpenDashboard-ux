import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

function SortableHeading({ label, toolTip, ascending, active, clickHandler }) {

    return (
        <button className="btn-text" onClick={() => clickHandler()} title={ toolTip }>
            {label}&nbsp;
                <FontAwesomeIcon
                icon={ascending ? faCaretUp : faCaretDown}
                className={active ? 'invisible' : ''} />
        </button>
    );
}

export default SortableHeading;
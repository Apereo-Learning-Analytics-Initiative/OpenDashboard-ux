import React from 'react';
import moment from 'moment';

export function EventTooltip ({ x, y, events, date }) {
    return (
        <div className="tool-tip-info tool-tip-event-info" style={{
            top: y,
            left: x
        }}>
            <span className="tooltip-lineitem">
                <span className="info-label">Date: </span>
                <span className="info-value">{moment(date).format('M-D')}</span>
            </span>
            <span className="tooltip-lineitem">
                <span className="info-label">Events: </span>
                <span className="info-value">{events}</span>
            </span>
        </div>
    );
}
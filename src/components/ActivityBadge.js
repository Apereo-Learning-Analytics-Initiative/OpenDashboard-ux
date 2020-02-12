import React from 'react';

export function ActivityBadge ({ data, className, children }) {
    return (
        <span className={`badge badge-lg badge-info`}>{children} {data}</span>
    )
}
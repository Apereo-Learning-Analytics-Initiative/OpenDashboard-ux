import React from 'react';
import { getRiskColor } from '../shared/util/risk';

export function RiskBadge ({ risk, className, children }) {
    return (
        <span className={`badge badge-lg badge-${getRiskColor(risk)} ${className}`}>{children} {isNaN(risk) ? 'N/A' : risk}</span>
    )
}
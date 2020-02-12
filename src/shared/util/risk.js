import moize from 'moize';

export const RiskClass = Object.freeze({
    HIGH: 'high-risk',
    MEDIUM: 'medium-risk',
    NONE: 'no-risk',
    INVALID: 'invalid-risk'
});

export const RiskThreshold = Object.freeze({
    [RiskClass.HIGH]: [0, 0.5],
    [RiskClass.MEDIUM]: [0.501, 0.7],
    [RiskClass.NONE]: [0.701, 1],
    [RiskClass.INVALID]: undefined
});

export const RiskClasses = [
    {
        threshold: RiskThreshold[RiskClass.HIGH],
        classname: RiskClass.HIGH
    },
    {
        threshold: RiskThreshold[RiskClass.MEDIUM],
        classname: RiskClass.MEDIUM
    },
    {
        threshold: RiskThreshold[RiskClass.NONE],
        classname: RiskClass.NONE
    },
    {
        threshold: RiskThreshold[RiskClass.INVALID],
        classname: RiskClass.INVALID
    }
];

export const getRiskColor = moize(
    (risk) => {
        return !risk || isNaN(risk) ? RiskClass.INVALID : RiskClasses.find(r => r.threshold[0] <= risk && risk <= r.threshold[1]).classname;
    }
);
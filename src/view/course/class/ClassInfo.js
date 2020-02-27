import React from 'react';

import { useSelectedClass, useCourseConfig } from '../../../context/Course';
import { RiskClasses, RiskClass } from '../../../shared/util/risk';
import { getMoment } from '../../../shared/util/date';

export function ClassInfo() {
    const selected = useSelectedClass();

    const config = useCourseConfig();
    
    const startDate = React.useMemo(
        () => getMoment(selected.startdate).format('MMM D'),
        [selected.startdate]
    );

    const endDate = React.useMemo(
        () => getMoment(selected.enddate).format('MMM D'),
        [selected.enddate]
    );

    const studentsAtRisk = React.useMemo(
        () => !config.hasRisk ? null : selected.students.map(
            s => {
                if (isNaN(s.riskAsDouble)) { return ''; }
                return RiskClasses.find(r => r.threshold[0] <= s.riskAsDouble && s.riskAsDouble <= r.threshold[1]).classname;
            }
        ).filter(r => r === RiskClass.HIGH || r === RiskClass.MEDIUM).length,
        [selected.students, config.hasRisk]
    );    

    return (
        <React.Fragment>
            <h2 className="h4 mb-4">
                <b>{selected.label}</b>&nbsp; - &nbsp;
                {selected.students.length} students
            </h2>
            <div className="d-flex justify-content-between info-boxes class-info-boxes flex-lg-row flex-sm-column">
                <div className="d-flex bg-dark text-light flex-fill">
                    <div className="p-4 d-flex flex-column align-items-center flex-fill">
                        <div className="h2">{startDate}</div>
                        <div className="text-uppercase small">Start Date</div>
                    </div>
                    <div className="p-4 d-flex flex-column align-items-center flex-fill">
                        <div className="h2">{endDate}</div>
                        <div className="text-uppercase small">End Date</div>
                    </div>
                </div>
                <div className="d-flex text-light flex-fill my-sm-4 my-lg-0 mx-lg-4">
                    { studentsAtRisk !== null ?
                    <div className="bg-warning p-4 d-flex flex-column align-items-center flex-fill">
                        <div className="h2"><i className="fa-facebook"></i> {studentsAtRisk}</div>
                        <div className="text-uppercase small">At Risk</div>
                    </div>
                    : ''}

                </div>
                <div className="d-flex bg-dark text-light flex-fill">
                    <div className="p-4 d-flex flex-column align-items-center flex-fill">
                        <div className="h2">{selected.studentEventMax}</div>
                        <div className="text-uppercase small">Max Activity</div>
                    </div>
                    <div className="p-4 d-flex flex-column align-items-center flex-fill">
                        <div className="h2">{selected.medianStudentEvents}</div>
                        <div className="text-uppercase small">Median Activity</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ClassInfo;
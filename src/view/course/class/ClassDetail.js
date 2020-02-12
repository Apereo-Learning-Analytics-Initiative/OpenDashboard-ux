import React, { useEffect } from 'react';
import {
    useSelectedClass,
    useCourseConfig,
    useSelectedClassFirstDate,
    useSelectedClassLastDate
} from '../../../context/Course';
import ClassRisk from './ClassRisk';
import ClassAssignments from './ClassAssignments';
import { FilterContext, actions as FilterActions } from '../../../context/Filter';

export function ClassDetail() {

    const currentClass = useSelectedClass();
    const config = useCourseConfig();

    const first = useSelectedClassFirstDate();
    const last = useSelectedClassLastDate();

    const { dispatch } = React.useContext(FilterContext);

    useEffect(() => {
        dispatch({ type: FilterActions.SET_DATES, payload: {
            start: first,
            end: last
        }});
    }, [dispatch, first, last]);

    return (
        <div className="d-flex flex-column">
            {config.hasRisk ?
                <section className="mt-4">
                    <ClassRisk selectedClass={currentClass} config={config}></ClassRisk>
                </section>
                : ''}
            <section className="mt-4">
                <ClassAssignments
                    selectedClass={currentClass}
                    config={config}
                    firstDate={first}
                    lastDate={last}></ClassAssignments>
            </section>
        </div>
    );
}

export default ClassDetail;
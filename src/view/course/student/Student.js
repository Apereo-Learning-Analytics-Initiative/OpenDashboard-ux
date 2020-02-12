import React from 'react';

import LoadModules from '../../../shared/loaders/LoadModules';
import { CourseContext, actions as CourseActions, useSelectedStudentId } from '../../../context/Course';

export function Student ({ studentId, children }) {
    const { dispatch } = React.useContext(CourseContext);
    React.useEffect(() => {
        dispatch({ type: CourseActions.SELECT_STUDENT, payload: studentId });
    }, [studentId, dispatch]);

    const id = useSelectedStudentId();
    return (
        <LoadModules studentId={studentId}>
            { id ? children : null }
        </LoadModules>
    );
}

export default Student;
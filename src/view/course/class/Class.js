import React from 'react';
import { CourseContext, useSelectedClassId, actions as CourseActions } from '../../../context/Course';

export function Class({ classId, children }) {
    const { dispatch } = React.useContext(CourseContext);
    React.useEffect(() => {        
        dispatch({ type: CourseActions.SELECT_CLASS, payload: classId });
    }, [classId, dispatch]);

    const id = useSelectedClassId();
    return <React.Fragment>{id ? children : null}</React.Fragment>;
}

export default Class;
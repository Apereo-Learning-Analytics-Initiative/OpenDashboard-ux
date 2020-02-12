import React from 'react';
import useFetch from 'fetch-suspense';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';
import moment from 'moment';

import { getMoment } from '../shared/util/date';
import { useSelectors } from '../shared/hooks/useSelectors';
import { useStudentEventUrl, usePulseDataUrl } from '../shared/path';
import { DATA_DATE_FORMAT } from '../shared/constant';

export const actions = {
    SELECT_CLASS: '[Course Context] Set Selected Class',
    SELECT_STUDENT: '[Course Context] Set Selected Student',
    LOAD_COURSE_SUCCESS: '[Course Context] Load Course Success'
};

export const initialState = {
    selectedClassId: null,
    selectedStudentId: null,
    course: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.SELECT_CLASS: {
            const { payload } = action;
            return {
                ...state,
                selectedClassId: payload
            };
        }
        case actions.SELECT_STUDENT: {
            const { payload } = action;
            return {
                ...state,
                selectedStudentId: payload
            };
        }
        case actions.LOAD_COURSE_SUCCESS: {
            const { payload } = action;
            
            return {
                ...state,
                course: payload
            };
        }
        default: {
            return state;
        }
    }
};


export const CourseContext = React.createContext({
    state: initialState
});

export function CourseProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <CourseContext.Provider value={{state, dispatch}} {...props} />;
}

export function useCourseContextSelectors(r) {
    return useSelectors(r, (state) => {
        return {
            getSelectedClassId: () => {
                return state.selectedClassId;
            },
            getCourse: () => {
                return state.course || {};
            },
            getStudentId: () => {
                return state.selectedStudentId;
            }
        };
    });
}

export function useCourseSelectors() {
    const courseContext = React.useContext(CourseContext);
    return useCourseContextSelectors([courseContext.state, courseContext.dispatch]);
}

export function useSelectedClassId() {
    return useCourseSelectors().getSelectedClassId();
}

export function useCourse() {
    return useCourseSelectors().getCourse();
}

export function useCourseTenantId() {
    return useCourse().tenantId;
}

export function useClasses() {
    return useCourse().pulseClassDetails || [];
}

export function useSelectedClass() {
    const classId = useSelectedClassId();
    const classes = useClasses();

    return classes.find(course => course.id === classId);
}

export function useSelectedClassEventList() {
    const currentClass = useSelectedClass();
    return Object.keys(currentClass.eventTypeTotals);
}

export function useSelectedClassDates() {
    const students = useSelectedClass().students;
    return React.useMemo(() => {
        const flattened = students.flatMap(
            s => s.events.map(e => getMoment(e.date).format())
        );
        const uniqueDates = uniq(flattened);
        return sortBy(uniqueDates, d => getMoment(d).toDate().getTime());
    }, [students]);
}

export function useSelectedClassFirstDate() {
    return moment(useSelectedClassDates()[0]).subtract({ days: 1 }).format();
}

export function useSelectedClassLastDate() {
    const sorted = useSelectedClassDates();
    return moment(sorted[sorted.length - 1]).add({ days: 2 }).format();
}

export function useSelectedStudentId() {
    return useCourseSelectors().getStudentId();
}

export function useSelectedStudent() {
    const studentId = useSelectedStudentId();
    const selectedClass = useSelectedClass();

    return selectedClass.students.find(s => s.id === studentId);
}

export function useCourseConfig() {
    const course = useCourse();
    const { pulseClassDetails, ...config } = course;
    return config;
}


export function useStudentEvents() {
    return useFetch(
        useStudentEventUrl(useSelectedClassId(), useSelectedStudentId()),
        {
            credentials: 'include',
            lifespan: 0
        }
    );
}

export function usePulseData() {
    return useFetch(usePulseDataUrl(useSelectedClassId(), "test"), {
        credentials: 'include',
        lifespan: 0
    },
    { metadata: true });
}

export function useStudentFirstEventDate(events) {
    const selectedClass = useSelectedClass();
    const classStart = getMoment(selectedClass.startdate);
    const sorted = sortBy(events, 'timestamp');
    const firstEventDate = sorted.length ? sorted[0].timestamp : moment();
    const d = classStart.isBefore(firstEventDate) ? classStart : firstEventDate;
    return moment(d).valueOf();
}

/*export function useStudentLastEventDate(events) {
    const sorted = sortBy(events, 'timestamp');
    const selectedClass = useSelectedClass();
    const classEnd = getMoment(selectedClass.enddate);
    const lastEventDate = sorted.length ? sorted[sorted.length - 1].timestamp : moment();
    const d = classEnd.isAfter(lastEventDate) ? classEnd : lastEventDate;
    return moment(d).valueOf();
}*/

export function useStudentLastEventDate(events) {
    const today = moment().toObject();
    const { years, months, date } = today;

    return moment({ years, months, date }).valueOf();
}

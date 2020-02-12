import React from 'react';
import { Route } from 'react-router-dom';

import { CourseContext, useCourse, actions as CourseActions, usePulseData } from '../../context/Course';
import { normalizeDate } from '../../shared/util/date';

import { BrandHeader } from '../layout/BrandHeader';
import { BrandFooter } from '../layout/BrandFooter';

import { CourseHeader } from './CourseHeader';
import { Class } from './class/Class';
import { ClassInfo } from './class/ClassInfo';
import { ClassDetail } from './class/ClassDetail';
import { Student } from './student/Student';
import { StudentDetail } from './student/StudentDetail';
import { ErrorMessage } from '../../components/ErrorMessage';

function convertEvent(event) {
    return ({
        ...event,
        date: event.date = normalizeDate(event.date)
    });
}

export function Course({ match }) {

    //const url = `${payload.apiBaseUrl}/courselist/${payload.tenantId}/pulse/${payload.userId}`;
    // const url = `http://localhost:8081/api/tenants`;

    const { dispatch } = React.useContext(CourseContext);
    const { response, ok } = usePulseData();
    const courses = ok ? response : {};

    React.useEffect(() => {
        if (ok) {
            const parsed = {
                ...courses,
                pulseClassDetails: courses.pulseClassDetails
                    .map(cls => ({
                        ...cls,
                        students: cls.students.map(
                            s => ({
                                ...s,
                                events: s.events.map(e => convertEvent(e))
                            })
                        ),
                        events: cls.events.map(
                            e => convertEvent(e)
                        )
                    }))
            };
            dispatch({ type: CourseActions.LOAD_COURSE_SUCCESS, payload: parsed });
        }
    }, [courses, dispatch, ok]);

    const course = useCourse();
    //{ course ? <ClassInfo class={ useSelectedClass() } /> : '' }
    return (
        <div className="d-flex h-100 flex-column justify-content-between">
            <BrandHeader />
            <main className="main main-course container my-3 flex-fill">
                {course && ok ?
                <React.Fragment>
                    <CourseHeader>
                        <Route path={`${ match.path }/:groupId`} render={
                            ({ match }) => <Class classId={ match.params.groupId }><ClassInfo /></Class>
                        } />
                    </CourseHeader>
                    <Route exact path={`${match.path}/:groupId`} render={
                        ({ match }) => <Class classId={match.params.groupId}>
                            <ClassDetail />
                        </Class>
                    } />
                    <Route exact path={`${match.path}/:groupId/student/:studentId`} render={
                        ({ match }) => 
                            <Class classId={match.params.groupId}>
                                <Student studentId={match.params.studentId}>
                                    <StudentDetail />
                                </Student>
                            </Class>
                    } />
                </React.Fragment>
                :
                <ErrorMessage error={response} />
                }
            </main>
            <BrandFooter />
        </div>
    );
}

export default Course;
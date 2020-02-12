import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { Card, CardBody } from 'reactstrap';
import uniqWith from 'lodash/uniqWith';

import {
    useSelectedStudent,
    useSelectedClass,
    useSelectedClassId,
    useCourseConfig,
    useStudentEvents,
    useStudentFirstEventDate,
    useStudentLastEventDate,
    useSelectedClassEventList
} from '../../../context/Course';
import { RiskBadge } from '../../../components/RiskBadge';
import { ActivityBadge } from '../../../components/ActivityBadge';
import EventFilter from '../../../components/EventFilter';
import { Button } from 'reactstrap';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { FilterContext, actions as FilterActions, useEventsToExclude } from '../../../context/Filter';
import DateFilter from '../../../components/DateFilter';

export function StudentInfo () {
    const student = useSelectedStudent();
    const currentClass = useSelectedClass();
    const classId = useSelectedClassId();
    const config = useCourseConfig();
    const eventData = useStudentEvents();
    const firstEventDate = useStudentFirstEventDate(eventData);
    const lastEventDate = useStudentLastEventDate(eventData);
    const eventList = useSelectedClassEventList();

    const { dispatch } = React.useContext(FilterContext);

    const events = useEventsToExclude();

    function updateEventsToExclude(event) {
        let list;
        if (events.indexOf(event) > -1) {
            list = events.filter(e => e !== event);
        } else {
            list = [...events, event];
        }
        dispatch({ type: FilterActions.EXCLUDE_EVENTS, payload: list });
    }

    function updateDateRange(start, end) {
        dispatch({ type: FilterActions.SET_DATES, payload: { start, end } });
    }

    function sendEmail () {
        //window.location = "mailto:" + student.email;
        //location.href = "mailto:" + student.email + '?&subject=A Message from the Student Success Dashboard';
        window.open(`mailto:${student.email}?subject=A Message from the Student Success Dashboard`, '0');
    }

    return (
        <Card>
            <CardBody className="d-flex align-items-center justify-content-between flex-sm-column flex-lg-row">
                <div className="d-flex align-items-center">
                    <Link className="btn btn-secondary" to={`/courselist/${classId}`}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <span className="sr-only">{currentClass.label}</span>
                    </Link>
                    <h3 className="h2 m-0 mx-4">{`${student.firstName} ${student.lastName}`}</h3>
                    <Button color="secondary" onClick={sendEmail}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </Button>
                    
                    { config.hasRisk ? <RiskBadge risk={student.riskAsDouble}>Risk:</RiskBadge> : '' }
                    <ActivityBadge data={student.activity}># of Events:</ActivityBadge>
                </div>
                <div className="d-flex align-items-center mt-sm-4 mt-lg-0">
                    <DateFilter onChange={updateDateRange} start={ firstEventDate } end={ lastEventDate }  />
                    <EventFilter className="ml-2" events={eventList} excluded={events} onChange={updateEventsToExclude} />
                </div>
            </CardBody>
        </Card>
    );
};
export default StudentInfo;
import React from 'react';
import { Button } from 'reactstrap';

import Chart from './DataChart';
import DataTable from './DataTable';
import { Views } from '../shared/constant';
import { useEventsToExclude, useEndDate, useStartDate } from '../context/Filter';
import { useSelectedStudent, useSelectedClass, useStudentFirstEventDate, useStudentLastEventDate } from '../context/Course';
import { useStudentEventUrl } from '../shared/path';

import { useFilteredEvents, useCachedData } from './DataUtility';

import { useTranslation } from '../context/Translate';
import InfoPopup from '../components/InfoPopup';
import { ErrorMessage } from '../components/ErrorMessage';



function DataModule({ module, view, uiConfig }) {
    const student = useSelectedStudent();
    const course = useSelectedClass();
    const excludeEvents = useEventsToExclude();
    const start = useStartDate();
    const end = useEndDate();


    let api = useStudentEventUrl(course.id, student.id);
    //let api = useBaseUrl() + module.api;
    //let api = '/json/events.1.json';
    const { response, ok } = useCachedData(api);
    const data = ok ? response : [];

    const events = useFilteredEvents(data, start, end, excludeEvents);
    const extra = {
        student,
        course
    };

    const firstEvent = useStudentFirstEventDate(data);
    const lastEvent = useStudentLastEventDate(data);

    const formatted = React.useMemo(
        () => uiConfig.format(events, start ? start : firstEvent, end ? end : lastEvent, extra),
        [uiConfig.format, events, start, end, firstEvent, lastEvent]
    );

    return (
        <div className="my-2">
            <h3>{useTranslation(uiConfig.label)} 
                &nbsp;                   
                <InfoPopup 
                        header={useTranslation(uiConfig.label)}
                        body={useTranslation(uiConfig.tooltip)}
                />
            </h3>
            {uiConfig.filters ?
                <nav className="data-module-filters">
                    {uiConfig.filters.map((filter, index) =>
                        <Button key={index} color="link" onClick={() => filter.filter(formatted)}>{filter.label}</Button>
                    )}
                </nav>
                : null}
            { ok ?
            <div className="data-module-content">
                {view === Views.CHART ?
                    <Chart data={formatted} redraw={true} configuration={uiConfig} height={ uiConfig.height || 100 } /> :
                    <DataTable data={formatted} configuration={uiConfig}></DataTable>
                }
            </div>
            :
            <ErrorMessage error={response } />
            }        
        </div>
        
    );
}

export default DataModule;
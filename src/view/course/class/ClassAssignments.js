import React from 'react';

import { Button, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

import orderBy from 'lodash/orderBy';
import moment from 'moment';
import * as d3 from 'd3';

import {RiskBadge} from '../../../components/RiskBadge';
import SortableHeading from '../../../components/SortableHeading';

import { EventTooltip } from '../../../charts/EventTooltip';
import { EventBubbles } from '../../../charts/EventBubbles';
import { EventTimeline } from '../../../charts/EventTimeline';

import { useTranslation } from '../../../context/Translate';
import {getDateRange} from '../../../shared/hooks/useDateRange';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InfoPopup from '../../../components/InfoPopup';

import {
    useSortOrder,
    useSortOn,
    SortFields,
    SortOrders,
    actions as FilterActions,
    FilterContext,
    useStartDate,
    useEndDate
} from '../../../context/Filter';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export const today = new Date();
export const todayMoment = moment(today);
export const minus90Moment = moment(today).subtract({ days: 90 });
export const minus30Moment = moment(today).subtract({days: 30});
export const minus7Moment = moment(today).subtract({days: 7});

export function useTimeScale(courseStart, courseEnd, width) {
    return React.useMemo(() => {
        const time = d3.scaleTime();
        time.domain([
            courseStart,
            courseEnd
        ]);
        time.range([50, width - 50]);

        return time;
    }, [courseStart, courseEnd, width]);
}

export function useCourseStart(dateRange) {
    return React.useMemo(() => {
        return moment(dateRange[0]);
    }, [dateRange]);
}

export function useCourseEnd(dateRange) {
    return React.useMemo(() => {
        return moment(dateRange[dateRange.length - 1]);
    }, [dateRange]);
}

export function useCourseTicks(courseStart, courseEnd) {
    return React.useMemo(() => {
        const duration = moment.duration(courseEnd - courseStart);
        const days = duration.asDays();
        const ticks = days <= 21 ? days : duration.asWeeks();
        return ticks;
    }, [courseEnd, courseStart]);
}

function debounce(fn, ms) {
    let timer;
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
}

export const FilterTypes = Object.freeze({
    BUTTON: 'button',
    RANGE: 'range'
})

function ClassAssignments({ selectedClass, config, firstDate, lastDate }) {

    const sortOrder = useSortOrder();
    const sortOn = useSortOn();
    const startDate = useStartDate();
    const endDate = useEndDate();

    const firstTime = moment(firstDate).valueOf();
    const lastTime = moment(lastDate).valueOf();

    const startTime = moment(startDate).valueOf();
    const endTime = moment(endDate).valueOf();

    const ascending = sortOrder === SortOrders.ASC;
    
    const { dispatch } = React.useContext(FilterContext);

    const changeSort = (field) => {
        if (field === sortOn) {
            dispatch({
                type: FilterActions.SET_SORT_ORDER,
                payload: ascending ? SortOrders.DESC : SortOrders.ASC
            })
        } else {
            dispatch({
                type: FilterActions.SET_SORT_ON,
                payload: field
            })
        }
    };
    
    const riskHeading = (
        <th className="w-10">
        <SortableHeading
            label={useTranslation('LABEL_RISK_SCORE')}
            toolTip={useTranslation('LABEL_RISK_SCORE_TOOLTIP')}
            clickHandler={() => changeSort(SortFields.RISK) }
            ascending={ascending}
            active={sortOn !== SortFields.RISK} />
        </th>
    );

    let students = React.useMemo(() => {
        return orderBy(selectedClass.students, [sortOn], [sortOrder]);
    }, [selectedClass.students, sortOn, sortOrder]);

    const dateRange = getDateRange(startDate, endDate);

    const firstMoment = moment(firstDate);
    const lastMoment = moment(lastDate);

    const filterDates = (start, end) => {
        dispatch({type: FilterActions.SET_DATES, payload: {
            start: moment(start).format(),
            end: moment(end).format()
        }});
    };

    const fitDatesToEvent = (date) => {
        const start = moment(date).subtract({ days: 3 }).format();
        const end = moment(date).add({ days: 4 }).format();

        dispatch({ type: FilterActions.SET_DATES, payload: { start, end } });
    };

    const [tooltip, setTooltip] = React.useState(null);

    const [height] = React.useState(60);
    const [width, setWidth] = React.useState(null);

    const events = React.useMemo(() => {
        return selectedClass.events.filter(event => moment(event.date).isBetween(moment(startDate), moment(endDate)))
    }, [startDate, endDate, selectedClass.events]);

    const heading = React.useRef();

    const courseStart = useCourseStart(dateRange);
    const courseEnd = useCourseEnd(dateRange);
    const ticks = useCourseTicks(courseStart, courseEnd);
    const timeScale = useTimeScale(courseStart, courseEnd, width);

    function handleResize() {
        const node = heading.current;
        setWidth(node.getBoundingClientRect().width);
    }

    React.useEffect(() => {
        
        const debouncedHandleResize = debounce(handleResize, 200);

        window.addEventListener('resize', debouncedHandleResize);

        handleResize();

        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
        };
    });

    function handleRange (ev) {
        filterDates(moment(ev[0]), moment(ev[1]));
    };

    const filterType = FilterTypes.RANGE;

    const tipFormatter = (value) => moment(value).format('M-D');

    const [sliderValue, setSliderValue] = React.useState([startTime, endTime]);

    React.useEffect(() => {
        setSliderValue([startTime, endTime]);
    }, [startTime, endTime]);

    return (
        <Card>
        <div className="class-assignments">
            <table className="table table-align-middle class-assignment-table">
                <thead className="class-assignment-heading">
                    <tr>
                        <th className="w-25">
                            <SortableHeading
                                label={'Student'}
                                toolTip={useTranslation('LABEL_ACTIVITY_TOOLTIP')}
                                clickHandler={() => changeSort(SortFields.LAST_NAME) }
                                ascending={ascending}
                                active={sortOn !== SortFields.LAST_NAME} />
                        </th>
                        <th className="actions"></th>
                        {config.hasRisk ? riskHeading : null}
                        <th className="w-10 text-center">
                            <SortableHeading
                                label={useTranslation('LABEL_ACTIVITY')}
                                toolTip={useTranslation('LABEL_ACTIVITY_TOOLTIP')}
                                clickHandler={() => changeSort(SortFields.ACTIVITY) }
                                ascending={ascending}
                                active={sortOn !== SortFields.ACTIVITY} />
                        </th>
                        <th ref={heading} className="timeline-heading w-10">
                            {width ?
                            <React.Fragment>
                                <div className="px-4 pb-1 pt-3">
                                    <p className="text-center m-0">
                                        <span className="mr-2">Date Range</span>
                                        <InfoPopup 
                                            header="Date Range"
                                            body="Use this slider to narrow the date range displayed"
                                            >
                                        </InfoPopup>
                                    </p>
                                      

                                    <div className="border-top border-bottom p-2 mt-1">
                                    {
                                        filterType === FilterTypes.BUTTON ?
                                            <div className="d-flex justify-content-end">
                                                <Button color="link" onClick={() => filterDates(minus90Moment, todayMoment)}>Last 90 Days</Button>
                                                <Button color="link" onClick={() => filterDates(minus30Moment, todayMoment)}>Last 30 Days</Button>
                                                <Button color="link" onClick={() => filterDates(minus7Moment, todayMoment)}>Last 7 Days</Button>
                                                <Button color="link" onClick={() => filterDates(firstMoment, lastMoment)}>Fit to Data</Button>
                                            </div>
                                        :
                                        <Range
                                            tipFormatter={ tipFormatter }
                                            min={firstTime}
                                            max={ lastTime }
                                            value={ sliderValue }
                                            onChange={ setSliderValue }
                                            onAfterChange={ handleRange }
                                            allowCross={false}
                                            pushable={true}
                                            />
                                    }
                                    </div>
                                </div>
                                <EventBubbles
                                    events={events}
                                    height={height}
                                    maxEvents={selectedClass.classEventMax}
                                    timeScale={timeScale}
                                    showToolTip={setTooltip}
                                    onBubbleClick={ fitDatesToEvent }
                                    color={'#00a9a7'} />
                                <EventTimeline
                                    timeScale={timeScale}
                                    height={height}
                                    ticks={ticks} />
                            </React.Fragment>
                            : '' }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student =>
                        <tr key={student.id}>
                            <td>
                                <Link className="text-left btn btn-secondary btn-block" to={`/courselist/${selectedClass.id}/student/${student.id}`}>
                                    {`${student.firstName} ${student.lastName}`}
                                </Link>
                            </td>
                            <td>                    
                                <Button color="secondary" onClick={()=>window.open('mailto:'+student.email+'?subject=A Message from the Student Success Dashboard', '0')}>
                                   <FontAwesomeIcon icon={faEnvelope} />
                                </Button>
                            </td>
                            {config.hasRisk ?
                            <td>
                                <RiskBadge className="w-100" risk={ student.riskAsDouble } />
                            </td>
                            : null}
                            <td><span className="badge badge-lg badge-light w-100">{student.activity}</span></td>
                            <td>
                                {width ? <EventBubbles
                                    events={student.events}
                                    height={height / 2}
                                    maxEvents={selectedClass.studentEventMax}
                                    timeScale={timeScale}
                                    showToolTip={setTooltip}
                                    onBubbleClick={ fitDatesToEvent }
                                    color={'#00a9a7'} />
                                : ''}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {tooltip ? <EventTooltip x={tooltip.x} y={tooltip.y} date={tooltip.date} events={tooltip.events} /> : ''}
        </div>
        </Card>
    );
}

export default ClassAssignments;
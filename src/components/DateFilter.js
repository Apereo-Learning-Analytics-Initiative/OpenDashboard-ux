import React from 'react';
import DatePicker from 'react-datepicker';
import throttle from 'lodash/throttle';

import 'react-datepicker/dist/react-datepicker.css';

// https://react-day-picker.js.org/

export function DateFilter({onChange, start, end }) {
    const [startDate, setStartDate] = React.useState(start);
    const [endDate, setEndDate] = React.useState(end);

    React.useEffect(() => setStartDate(start), [start]);
    React.useEffect(() => setEndDate(end), [end]);

    const debouncedOnChange = throttle(onChange, 500);

    React.useEffect(() => {
        debouncedOnChange(startDate, endDate);
    }, [startDate, endDate]);

    return (
        <div className="d-flex date-picker-form">
            <div className="d-flex align-items-center">
                <label htmlFor="startDateFilter" className="mr-1 mb-0">Start</label>
                <DatePicker
                    id="startDateFilter"
                    className="form-control"
                    minDate={ start }
                    maxDate={endDate ? endDate : new Date()}
                    selected={startDate}
                    onChange={setStartDate}
                />
            </div>
            <div className="d-flex align-items-center">
                <label htmlFor="endDateFilter" className="mr-1 ml-2 mb-0">End</label>
                <DatePicker
                    id="endDateFilter"
                    className="form-control"
                    minDate={ startDate }
                    maxDate={ end }
                    selected={endDate}
                    onChange={setEndDate}
                />
            </div>
        </div>
    );
}

export default DateFilter;
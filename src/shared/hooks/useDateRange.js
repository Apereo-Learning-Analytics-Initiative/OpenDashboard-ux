import moize from 'moize';
import * as moment from 'moment';

function calcDateRange(start, end) {
    const startDate = moment(start);
    const endDate = moment(end);
    const dateArray = [];
    const dt = moment(startDate);
    while (dt.isBefore(endDate)) {
        dateArray.push(new Date(dt));
        dt.add(1, 'd');
    }
    return dateArray;
}

export const getDateRange = moize(calcDateRange);

export function useDateRange(start, end) {
    return getDateRange(start, end);
}

export default useDateRange;
import { eventColors } from '../DataUtility';
import groupBy from 'lodash/groupBy';

export const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export default {
    //label: 'Activity By Day of Week Doughnut',
    height: 100,
    label: 'LABEL_ACTIVITY_BY_DAY_OF_WEEK_DOUGHNUT_CHART_LABEL',
    tooltip: 'LABEL_ACTIVITY_BY_DAY_OF_WEEK_DOUGHNUT_CHART_TOOLTIP',
    type: 'Doughnut',
    table: {
        inverse: true,
        cornerHeader: 'Activity'
    },
    format: (data) => {
        const grouped = groupBy(data, 'dayOfWeek');
        return ({
            labels: daysOfWeek,
            datasets: [{
                backgroundColor: eventColors,
                data: daysOfWeek.map(day => grouped.hasOwnProperty(day) ? grouped[day].length : 0)
            }]
        })
    },
    options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
            display: true,
            position: 'left'
        }
    }
};
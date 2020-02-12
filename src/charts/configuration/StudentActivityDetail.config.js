import groupBy from 'lodash/groupBy';
import { moment } from '../../shared/util/date';
import { DATA_DATE_FORMAT } from '../../shared/constant';
import { getColorsForEvents, getRange } from '../DataUtility';

function groupByDay(data) {
    return groupBy(data.map(event => ({
        ...event,
        day: moment(event.date).format(DATA_DATE_FORMAT)
    })), 'day');
}

function eventsOnDate(day, data) {
    const grouped = groupByDay(data);
    const key = day.format(DATA_DATE_FORMAT);
    return grouped.hasOwnProperty(key) ? grouped[day.format(DATA_DATE_FORMAT)].length : 0;
}

export default {
    //label: 'Detail Activity',
    label: "LABEL_DETAIL_ACTIVITY_BAR_CHART_LABEL",    
    tooltip: "LABEL_DETAIL_ACTIVITY_BAR_CHART_TOOLTIP", 
    type: 'Bar',
    height: 75,
    table: {
        inverse: false,
        cornerHeader: 'Date'
    },    
    format: (data, start, end) => {
        const grouped = groupBy(data, 'shortVerb');
        const range = getRange(data, start, end);
        const dateList = Array.from(range.by('day'));
        const colors = getColorsForEvents(Object.keys(grouped));
        
        return ({
            labels: dateList,
            datasets: Object.keys(grouped).map(label => ({
                label,
                data: dateList.map(day => eventsOnDate(day, grouped[label])),
                backgroundColor: colors[label]
            }))
        });
    },
    options: {
        legend: {
            display: true
        },
        maintainAspectRatio: true,
        scales: {
            yAxes: [
                {
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }
            ],
            xAxes: [
                {
                    stacked: true,
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'MM-DD'
                        }
                    }
                }
            ]
        }
    }
};
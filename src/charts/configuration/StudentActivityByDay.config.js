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
    label: 'LABEL_ACTIVITY_BY_DAY_OF_WEEK_LINE_CHART_LABEL',
    tooltip: 'LABEL_ACTIVITY_BY_DAY_OF_WEEK_LINE_CHART_TOOLTIP',
    //label: "LABEL_DETAIL_ACTIVITY_BAR_CHART_LABEL": "Detail Activity",    
    //tooltip: "LABEL_DETAIL_ACTIVITY_BAR_CHART_TOOLTIP"
    type: 'Line',
    height: 100,
    table: {
        inverse: true,
        cornerHeader: 'Activity'
    },
    format: (data) => {
        const grouped = groupBy(data, 'dayOfWeek');
        return ({
            labels: daysOfWeek,
            datasets: [{
                backgroundColor: "#a6cee3",
                data: daysOfWeek.map(day => grouped.hasOwnProperty(day) ? grouped[day].length : 0)
            }]
        })
    },
    options: {
        legend: {
            display: false
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
                    stacked: true
                }
            ]
        }
    }
};
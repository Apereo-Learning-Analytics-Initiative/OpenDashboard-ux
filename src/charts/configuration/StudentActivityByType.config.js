import groupBy from 'lodash/groupBy';

var clrs = [
    'rgba(6, 11, 178, 0.5)',
    'rgba(84, 255, 0, 0.5)',
    'rgba(255, 132, 7, 0.5)',
    'rgba(29, 178, 37, 0.5)',
    'rgba(13, 191, 255, 0.5)',
    'rgba(232, 6, 222, 0.5)',
    'rgba(232, 163, 12, 0.5)',
    'rgba(50, 12, 132, 0.5)',
    'rgba(13, 175, 255, 0.5)',
    'rgba(248, 255, 0, 0.5)',
    'rgba(232, 143, 12, 0.5)'
];

export default {
    label: "LABEL_ACTIVITY_BY_TYPE_BAR_CHART_LABEL",    
    tooltip: "LABEL_ACTIVITY_BY_TYPE_BAR_CHART_TOOLTIP", 
    type: 'Bar',
    height: 75,
    table: {
        inverse: true
    },
    format: (data, start, end, config) => {
        const grouped = groupBy(data, 'shortVerb');
        const unique = [...new Set(data.map(item => item.shortVerb))];
        const averages = config.course.eventTypeAverages;
        return ({
            labels: unique,
            datasets: [{
                label: 'Total',
                backgroundColor: unique.map((evt, idx) => clrs[idx] ? clrs[idx] : clrs[0]),
                student: config.student,
                total: unique.map(evt => grouped.hasOwnProperty(evt) ? grouped[evt].length : 0),
                data: unique.map(evt => grouped.hasOwnProperty(evt) ? grouped[evt].length / averages[evt] : 0)
            },
            {
                label: 'Class Average',
                backgroundColor: 'rgba(135, 135, 135, 0.7)',
                averages: config.course.eventTypeAverages,
                data: unique.map(day => 1)
            }]
        })
    },
    options: {
        legend: {
            display: false
        },
        maintainAspectRatio: true,
        stacked: false,
        scales: {
            yAxes: [
                {
                    display: false,
                    ticks: {
                        max: 2,
                        beginAtZero: true
                    }
                }
            ]
        },
        tooltips: {
            callbacks: {
                label: (item, chart) => {
                    const data = chart.datasets[item.datasetIndex];
                    if (item.datasetIndex === 0) {
                        return `${data.student.firstName}:${data.total[item.index]}`;
                    } else {
                        return `Course Average: ${Math.round(data.averages[item.label])}`;
                    }
                }
            }
        }
    }
};
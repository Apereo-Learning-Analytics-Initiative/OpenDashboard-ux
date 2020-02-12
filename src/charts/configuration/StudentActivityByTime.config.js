import groupBy from 'lodash/groupBy';

export const hoursOfDay = [
    "00", "01", "02", "03", "04","05", "06", "07", "08", "09",
	"10", "11", "12", "13", "14","15", "16", "17", "18", "19",
	"20", "21", "22", "23"
];

export default {
    //label: 'Activity By Time of Day',
    //tooltip: 'this is a test',

    label: "LABEL_ACTIVITY_BY_TIME_LINE_CHART_LABEL",    
    tooltip: "LABEL_ACTIVITY_BY_TIME_LINE_CHART_TOOLTIP", 
    height: 75,
    type: 'Line',
        table: {
        inverse: true,
        cornerHeader: 'Hour'
    },
    format: (data) => {
        const grouped = groupBy(data, 'hourOfDay');
        
        return ({
            labels: hoursOfDay,
            datasets: [{
                backgroundColor: "#a6cee3",
                data: hoursOfDay.map(day => grouped.hasOwnProperty(day) ? grouped[day].length : 0)                
            }]
        })
    },
    options: {
        legend: {
            display: false
        },
        stacked: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
}